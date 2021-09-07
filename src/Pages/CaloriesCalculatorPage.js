import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import './Styles/Tips.css'
import './Styles/CaloriesCalculator.css'


class CaloriesCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeAsupan = this.handleChangeAsupan.bind(this)
    this.state = {
      asupan: [
        ['Asinan', 208],
        ['Toge Goreng', 243],
        ['Gado-gado', 295],
        ['Ketoprak', 153],
        ['Pempek', 384],
        ['Rawon', 331],
        ['Soto Ayam', 101],
        ['Soto Padang', 127],
        ['Tongseng', 331],
        ['Hamburger', 257],
        ['Kerupuk Palembang', 72],
        ['Mie Bakso', 302]

      ],
      menu: {
        sarapan1: 0,
        sarapan2: 0,
        sarapan3: 0,
        makanSiang1: 0,
        makanSiang2: 0,
        makanSiang3: 0,
        makanMalam1: 0,
        makanMalam2: 0,
        makanMalam3: 0,
      },
      caloriesTotalPagi: 0,
      caloriesTotalSiang: 0,
      caloriesTotalMalam: 0,
      caloriesTotal: 0
    }
  }

  handleTotal = () => {
    const {
      caloriesTotalPagi,
      caloriesTotalSiang,
      caloriesTotalMalam,
    } = this.state
    this.setState({
      caloriesTotal: caloriesTotalPagi + caloriesTotalSiang + caloriesTotalMalam
    })
  }

  handleCalculation = () => {
    const {
      sarapan1,
      sarapan2,
      sarapan3,
      makanSiang1,
      makanSiang2,
      makanSiang3,
      makanMalam1,
      makanMalam2,
      makanMalam3
    } = this.state.menu
    var pagi = sarapan1 + sarapan2 + sarapan3
    var siang = makanSiang1 + makanSiang2 + makanSiang3
    var malam = makanMalam1 + makanMalam2 + makanMalam3
    this.setState({
      ...this.state.menu,
      caloriesTotalPagi: pagi,
      caloriesTotalSiang: siang,
      caloriesTotalMalam: malam,
    }, this.handleTotal
    )
  }

  handleChangeAsupan(e) {
    e.preventDefault()
    const { menu } = this.state
    const { name } = e.target
    var index = e.nativeEvent.target.selectedIndex;
    const { value } = e.nativeEvent.target[index];
    this.setState({
      menu: {
        ...menu,
        [name]: Number(value)
      }
    }, this.handleCalculation);
  }

  render() {
    const {
      asupan,
      caloriesTotalPagi,
      caloriesTotalSiang,
      caloriesTotalMalam,
      caloriesTotal
    } = this.state

    return (
      <>
        <div className='tips-container'>
          <div className='tips-header'>
            <img src='/images/headerAtasHijau.png' />
            <div className='header-title'>
              <h1>Healthy Life</h1>
              <p>Calories Calculator</p>
            </div>
          </div>

          <div style={{ height: '75%' }} className='tips-content'>
            <div className='calories-calculator'>
              <div className='sarapan'>
                <h2>Sarapan</h2>
                <select onChange={this.handleChangeAsupan} name='sarapan1'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>+</h3>
                <select onChange={this.handleChangeAsupan} name='sarapan2'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>+</h3>
                <select onChange={this.handleChangeAsupan} name='sarapan3'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>=</h3>
                <h2>Kalori: {caloriesTotalPagi} kal</h2>
              </div>
              <div className='makan-siang'>
                <h2>Makan Siang</h2>
                <select onChange={this.handleChangeAsupan} name='makanSiang1'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>+</h3>
                <select onChange={this.handleChangeAsupan} name='makanSiang2'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>+</h3>
                <select onChange={this.handleChangeAsupan} name='makanSiang3'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>=</h3>
                <h2>Kalori: {caloriesTotalSiang} kal </h2>
              </div>
              <div className='makan-malam'>
                <h2>Makan Malam</h2>
                <select onChange={this.handleChangeAsupan} name='makanMalam1'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>+</h3>
                <select onChange={this.handleChangeAsupan} name='makanMalam2'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>+</h3>
                <select onChange={this.handleChangeAsupan} name='makanMalam3'>
                  <option value='0'>Pilih Makanan</option>
                  <Fragment>
                    {
                      asupan.map(makanan => {
                        return (
                          <option value={makanan[1]}>{makanan[0]}</option>
                        )
                      })
                    }
                  </Fragment>
                </select>
                <h3>=</h3>
                <h2>Kalori: {caloriesTotalMalam} kal </h2>
              </div>
              <h2 style={{ color: '#3faf6c', textAlign: 'center', flex: '1 0 100%', margin: '10px 0' }}>Total Kalori: {caloriesTotal} kal </h2>
            </div>
          </div>

          <div style={{ margin: '30px 0' }} className='tips-footer'>
            <img src='/images/headerBawahHijau.png' />
          </div>
        </div>
      </>
    )
  }
}

export default CaloriesCalculator;
