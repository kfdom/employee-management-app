import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    // alerts.map(alert => (
    //   <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    //     {alert.msg}
    //   </div>
    // ));

    //display one alert at a time
    <div key={alerts[0].id} className={`alert alert-${alerts[0].alertType}`}>
      {alerts[0].msg}
    </div>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
