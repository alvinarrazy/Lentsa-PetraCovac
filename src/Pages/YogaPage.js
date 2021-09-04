/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './Styles/Tips.css'
import ConsoleHelper from '../redux/helpers/ConsoleHelper';
import './Styles/Yoga.css'
import Yoga from './Components/HealthyComp/Yoga';
import './Styles/Transition.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


class YogaPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleDecrementIndex = this.handleDecrementIndex.bind(this)
    this.handleIncrementIndex = this.handleIncrementIndex.bind(this)

    this.state = {
      healthyTips: [
        {
          header: 'Lompat Tali',
          src: '/images/skipping.png',
          alt: 'Lompat Tali',
          paragraph: 'Lompat tali membantu menurunan berat badan anda, membuat berkeringat, meningkatkan sistem imun, melancarkan metabolism.'
        },
        {
          header: 'Jogging',
          src: '/images/jogging.png',
          alt: 'Jogging',
          paragraph: 'Dengan jogging minimal 4 jam dalam 1 minggu, tubuh akan membakar kalori lebih banyak, bahkan ketika kita sudah tidak jogging. '
        },
        {
          header: 'Zumba',
          src: '/images/zumba.png',
          alt: 'Zumba',
          paragraph: 'Zumba tidak membutuhkan waktu yang lama. Anda cukup melakukan zumba selama 30 menit dalam sehari. Zumba dapat dilakukan di pagi ataupun sore hari.'
        },
        {
          header: 'Hula Hoop',
          src: '/images/hula-hoop.png',
          alt: 'Hula Hoop',
          paragraph: 'Bagi Wanita, Hula Hoop dapat membantu membentuk panggul. Bagi Pria, Hula Hoop dapat melatih stamina bagian bawah tubuh.'
        },
        {
          header: 'Yoga',
          src: '/images/yoga.png',
          alt: 'Yoga',
          paragraph: 'Melakukan Yoga selama 30 menit dalam sehari akan membuat tubuh anda menjadi lebih rileks dan juga membuat tidur anda lebih berkualitas.'
        },
      ],
      tipsIndex: 0,
      transitionTrigger: true,
      tipsDisplay: 'shown'
    }
  }

  handleTransition = () =>{
    this.setState({
      transitionTrigger: true
    })
  }

  handleIncrementIndex = () => {
    const { tipsIndex, healthyTips } = this.state
    if (tipsIndex === healthyTips.length - 1) {
      this.setState({
        transitionTrigger: false,
        tipsIndex: 0
      }, this.handleTransition)
    } else {
      this.setState({
        transitionTrigger: false,
        tipsIndex: tipsIndex + 1
      }, this.handleTransition)
    }
  }

  handleDecrementIndex = () => {
    const { tipsIndex, healthyTips } = this.state
    if (tipsIndex === 0) {
      this.setState({
        transitionTrigger: false,
        tipsIndex: healthyTips.length - 1
      }, this.handleTransition)
    } else {
      this.setState({
        transitionTrigger: false,
        tipsIndex: tipsIndex - 1
      }, this.handleTransition)
    }
  }

  render() {
    const { healthyTips, tipsIndex, transitionTrigger } = this.state
    return (
      <>
        <div className='tips-container'>
          <div className='tips-header'>
            <img src='/images/headerAtasHijau.png' />
            <div className='header-title'>
              <h1>Healthy Life</h1>
              <p>Olahraga #DirumahAja</p>
            </div>
          </div>
          <div className='tips-content'>
            <div className='left-arrow'>
              <a onClick={this.handleDecrementIndex}>
                <img src='/images/arah.png' />
              </a>
            </div>

              <CSSTransition
                in={transitionTrigger}
                classNames="alert"
                timeout={500}
              >
                <Yoga
                  key={tipsIndex}
                  header={healthyTips[tipsIndex].header}
                  src={healthyTips[tipsIndex].src}
                  alt={healthyTips[tipsIndex].alt}
                  paragraph={healthyTips[tipsIndex].paragraph}
                />
              </CSSTransition>
            <div className='right-arrow'>
              <a onClick={this.handleIncrementIndex}>
                <img style={{ transform: 'rotateY(180deg)' }} src='/images/arah.png' />
              </a>
            </div>
          </div>
          <div className='tips-footer'>
            <img src='/images/headerBawahHijau.png' />
          </div>
        </div>
      </>
    )
  }
}

export default YogaPage;
