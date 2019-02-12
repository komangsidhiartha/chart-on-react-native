import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native'
import update from 'immutability-helper'

import {LineChart} from 'react-native-charts-wrapper'

class TimeSeriesLineChartScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      legend: {
        enabled: false
      },
      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14
      },

      selectedEntry: "",
      yAxis: {left:{enabled: false}, right: {enabled: false}},
      xAxis: {
        axisLineWidth: 0,
        drawLabels: false,
        drawGridLines: false
      }
    }

  }

  componentDidMount() {
    const size = 80

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [ 11000, 90, 130, 11000, 2000, 9000, 11000 ],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: false,
                circleRadius: 0,
                highlightEnabled: true,
                drawHighlightIndicators: false,
                color: processColor('red'),
                drawFilled: true,
                valueTextSize:10,
                fillColor: processColor('red'),
                fillAlpha: 45,
                valueFormatter: "$###.0",
                circleColor: processColor('red')
              }
            }]
          }
        }
      })
    )
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height:80, backgroundColor: '#F5FCFF'}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>

          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}

            touchEnabled
            dragEnabled={false}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            drawGridBackground={false}
            drawBorders={false}

            yAxis={this.state.yAxis}
            xAxis={this.state.xAxis}


            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}

            ref="chart"
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

export default TimeSeriesLineChartScreen
