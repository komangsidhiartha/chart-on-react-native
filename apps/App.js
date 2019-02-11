import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native'
import update from 'immutability-helper'

import {LineChart} from 'react-native-charts-wrapper'

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      chart1Zoom: {scaleX: 3, scaleY: 1, xValue: 50, yValue: 0},
      chart2Zoom: {scaleX: 3, scaleY: 1, xValue: 50, yValue: 0}
    }
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: Array.from(new Array(600), (val, index) => index),
              label: 'Company X',
            }, {
              values: Array.from(new Array(600), (val, index) => index + 5),
              label: 'Company Y',
            }]
          }
        }
      })
    )
  }
  
  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height:40}}>
          <Text>Drag or zoom first chart</Text>
        </View>

        <View style={styles.container}>

          <LineChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}

            touchEnabled
            dragEnabled={false}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            zoom={this.state.chart1Zoom}

            ref="chart1"

            onChange={(event) => this.syncToChart2(event.nativeEvent)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
})

export default App
