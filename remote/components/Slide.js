import React, { Component, PanResponder, PropTypes, Text, View } from 'react-native';
import SlideContent from './SlideContent';
import Timer from './Timer';
import styles from './styles';
import colors from './colors';


module.exports = class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      borderColor: 'white'
    };
    this.toggleBorders = this._toggleBorders.bind(this);
  }

  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    currentSlide: PropTypes.number.isRequired,
    totalSlides: PropTypes.number.isRequired,
    currentSlideHtml: PropTypes.string.isRequired,
    currentSlideNotes: PropTypes.string.isRequired,
    elapsedTime: PropTypes.number.isRequired
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.toggleBorders(false);
        (gestureState.dx < 0 ? this.props.onPrev : this.props.onNext)();
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.toggleBorders(true);
      },
    });
  }

  render() {
    return (
      <View style={ [styles.slide, {borderColor: this.state.borderColor}] }>
        <View {...this._panResponder.panHandlers} >
          <Text style={ styles.h1 }>
            { this.props.currentSlide + 1 } / { this.props.totalSlides }
          </Text>

          <Timer elapsedTime={ this.props.elapsedTime } />
        </View>
        <SlideContent currentSlideHtml={ this.props.currentSlideHtml }
                      currentSlideNotes={ this.props.currentSlideNotes }
                      onNext={ this.props.onNext }
                      onPrev={ this.props.onPrev }
                      panResponder={this._panResponder} />
      </View>
    );
  }

  _toggleBorders(toggleOn){
    if (toggleOn){
      this.setState({borderColor:colors.highlight});
    } else {
      this.setState({borderColor:'white'});
    }
  }
};
