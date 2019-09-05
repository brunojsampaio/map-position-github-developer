import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapGL, { Marker } from 'react-map-gl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '../../store/ducks/modal';

import './styles.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: -22.116376,
        longitude: -43.209477,
        zoom: 8,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = async event => {
    const [longitude, latitude] = event.lngLat;
    const { showModal } = this.props;

    await showModal({ latitude, longitude });
  };

  render() {
    const { viewport: viewportState } = this.state;
    const { users } = this.props;
    return (
      <MapGL
        {...viewportState}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {users.data.map(user => (
          <Marker
            latitude={user.cordinates.latitude}
            longitude={user.cordinates.longitude}
            key={user.id}
          >
            <img
              className="avatar"
              alt={`${user.name} Avatar`}
              src={user.avatar}
            />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

Map.propTypes = {
  users: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        login: PropTypes.string,
        avatar: PropTypes.string,
        cordinates: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
