import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Spinner from 'react-spinkit';
import Misc from '../../../misc';
import PropTypes from 'prop-types';
import Form from './FormComponent';
import Actions from "../../../../actions";

const Dialog = Misc.Dialog;
const DeleteConfirmation = Misc.DeleteConfirmation;

export class Item extends Component {

  constructor(props) {
    super(props);
    this.editBill = this.editBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.getBillLocationBadge = this.getBillLocationBadge.bind(this);
    this.getInformationBanner = this.getInformationBanner.bind(this);
  }

  editBill = (body) => {
    body.id = this.props.bill.id;
    this.props.editBill(this.props.account, body);
  };

  deleteBill = () => {
    this.props.deleteBill(this.props.account, this.props.bill.id);
  };

  getBillLocationBadge = () => {
    if (this.props.bill.error !== "")
      return (<i className="fa account-badge fa-times-circle"/>);
    return (<i className="fa account-badge fa-check-circle"/>);
  };

  getInformationBanner = () => {
    if (this.props.bill.error)
      return (<ListItem divider className="bill-alert"><div className="alert alert-danger account-badge-information-banner">{"Oops, we couldn't import data: " + this.props.bill.error}</div></ListItem>);
    return null;
  };

  render() {
    const prefix = (this.props.bill.prefix.length) ? (
      <span className="badge blue-bg pull-right">Prefix : {this.props.bill.prefix}</span>
    ) : (null);

    const infoBanner = this.getInformationBanner();

    return (
      <div>

        <ListItem divider={(infoBanner === null)} className="bill-item">

          {this.getBillLocationBadge()}
          <ListItemText
            disableTypography
            primary={<span>
                {this.props.bill.bucket}
                {prefix}
              </span>}
          />

          <div className="actions">

            <div className="inline-block">
              <Form
                account={this.props.account}
                bill={this.props.bill}
                submit={this.editBill}
                status={this.props.editionStatus}
                clear={this.props.clearEdition}
                bills={this.props.bills}
              />
            </div>
            &nbsp;
            <div className="inline-block">
              <DeleteConfirmation entity={`this bill location`} confirm={this.deleteBill}/>
            </div>
          </div>

        </ListItem>

        {infoBanner}

      </div>
    );
  }

}

Item.propTypes = {
  account: PropTypes.number.isRequired,
  bill: PropTypes.shape({
    error: PropTypes.string.isRequired,
    bucket: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired
  }),
  editionStatus: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    value: PropTypes.object
  }),
  editBill: PropTypes.func.isRequired,
  clearEdition: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired
};

// List Component for AWS Accounts
export class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.getBills = this.getBills.bind(this);
    this.clearBills = this.clearBills.bind(this);
    this.newBill = this.newBill.bind(this);
  }

  getBills() {
    this.props.getBills(this.props.account);
  }

  clearBills() {
    this.props.clearBills();
  }

  newBill = (body) => {
    this.props.newBill(this.props.account, body);
  };

  render() {
    const loading = (!this.props.bills.status ? (<Spinner className="spinner" name='circle'/>) : null);

    const error = (this.props.bills.error ? ` (${this.props.bills.error.message})` : null);
    const noBills = (this.props.bills.status && (!this.props.bills.values || !this.props.bills.values.length || error) ? <div className="alert alert-warning" role="alert">No bills available{error}</div> : "");

    const bills = (this.props.bills.status && this.props.bills.values && this.props.bills.values.length ? (
      this.props.bills.values.map((bill, index) => (
        <Item
          key={index}
          bill={bill}
          account={this.props.account}
          editBill={this.props.editBill}
          editionStatus={this.props.billEdition}
          clearEdition={this.props.clearBillEdit}
          deleteBill={this.props.deleteBill}/>
      ))
    ) : null);

    const form = (<Form
      account={this.props.account}
      submit={this.newBill}
      status={this.props.billCreation}
      clear={this.props.clearNewBill}
      bills={this.props.bills}
    />);

    return (
      <Dialog
        buttonName={<span><i className="fa fa-map-marker"/> Bills location</span>}
        disabled={this.props.disabled}
        title="Bills locations"
        secondActionName="Close"
        onOpen={this.getBills}
        onClose={this.clearBills}
        titleChildren={form}
      >

        <List className="bills-list">
          {loading}
          {noBills}
          {bills}
        </List>

      </Dialog>
    );
  }

}

ListComponent.propTypes = {
  account: PropTypes.number.isRequired,
  bills: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    values: PropTypes.arrayOf(
      PropTypes.shape({
        error: PropTypes.string.isRequired,
        bucket: PropTypes.string.isRequired,
        prefix: PropTypes.string.isRequired
      })
    )
  }),
  billEdition: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    value: PropTypes.object
  }),
  billCreation: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    value: PropTypes.object
  }),
  getBills: PropTypes.func.isRequired,
  newBill: PropTypes.func.isRequired,
  editBill: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired,
  clearBills: PropTypes.func.isRequired,
  clearNewBill: PropTypes.func.isRequired,
  clearBillEdit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ListComponent.defaultProps = {
  disabled: false
};

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  bills: state.aws.accounts.bills,
  billCreation: state.aws.accounts.billCreation,
  billEdition: state.aws.accounts.billEdition
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  getBills: (accountID) => {
    dispatch(Actions.AWS.Accounts.getAccountBills(accountID));
  },
  newBill: (accountID, bill) => {
    dispatch(Actions.AWS.Accounts.newAccountBill(accountID, bill))
  },
  editBill: (accountID, bill) => {
    dispatch(Actions.AWS.Accounts.editAccountBill(accountID, bill))
  },
  deleteBill: (accountID, billID) => {
    dispatch(Actions.AWS.Accounts.deleteAccountBill(accountID, billID));
  },
  clearBills: () => {
    dispatch(Actions.AWS.Accounts.clearAccountBills());
  },
  clearNewBill: () => {
    dispatch(Actions.AWS.Accounts.clearNewAccountBill());
  },
  clearBillEdit: () => {
    dispatch(Actions.AWS.Accounts.clearEditAccountBill());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
