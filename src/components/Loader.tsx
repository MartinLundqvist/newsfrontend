import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 330px;
  height: 250px;
  top: 50%;
  left: 50%;
  background: var(--color-card);
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
  box-shadow: 3px 3px 5px 3px hsla(0, 0%, 0%, 0.25);
`;

const Styled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Bebas Neue', cursive;

  .line {
    position: absolute;
    height: 5px;
    background: var(--color-text);
    top: -2.5px;
  }

  .line.one {
    left: -150px;
    animation: line-one 1s linear forwards;
  }

  .line.two {
    left: 0px;
    animation: line-two 1s linear forwards;
  }

  .bracket-vd {
    position: absolute;
    width: 5px;
    height: 0px;
    left: -150px;
    background: var(--color-text);
    animation: bracket-vd 0.5s linear 1s forwards;
  }

  .bracket-vu {
    position: absolute;
    width: 5px;
    top: 0px;
    height: 0px;
    left: -150px;
    background: var(--color-text);
    animation: bracket-vu 0.5s linear 1s forwards;
  }

  .bracket-vu.two,
  .bracket-vd.two {
    left: 145px;
  }

  .bracket-hb {
    position: absolute;
    width: 0px;
    height: 5px;
    left: -150px;
    top: 45px;
    background: var(--color-text);
    animation: bracket-left 0.5s linear 1.5s forwards;
  }

  .bracket-ht {
    position: absolute;
    width: 0px;
    height: 5px;
    left: -150px;
    top: -50px;
    background: var(--color-text);
    animation: bracket-left 0.5s linear 1.5s forwards;
  }

  .bracket-ht.two,
  .bracket-hb.two {
    left: 150px;
    width: 0px;
    animation: bracket-right 0.5s linear 1.5s forwards;
  }

  .main-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* left: -100px;
    top: -35px; */
    font-size: 50px;
    font-weight: 700;
    color: var(--color-text);
    opacity: 0;
    animation: main-text 0.5s ease-in-out 1s forwards;
  }

  .text-top {
    position: absolute;
    left: -100px;
    top: -70px;
    font-size: 30px;
    font-weight: 300;
    color: var(--color-text);
    opacity: 0;
    animation: text-top 0.5s ease-in-out 1s forwards;
  }

  .text-bottom {
    position: absolute;
    left: -25px;
    top: 25px;
    font-size: 30px;
    font-weight: 300;
    color: var(--color-text);
    opacity: 0;
    animation: text-bottom 0.5s ease-in-out 1s forwards;
  }

  @keyframes circle {
    0% {
      transform: scale(0.7);
    }
    30% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes line-one {
    0% {
      width: 0px;
      left: 0px;
    }
    50% {
      width: 150px;
      left: -150px;
    }
    100% {
      width: 0px;
    }
  }

  @keyframes line-two {
    0% {
      width: 0px;
      left: 0px;
    }
    50% {
      width: 150px;
      left: 0px;
    }
    100% {
      width: 0px;
      left: 150px;
    }
  }

  @keyframes bracket-vd {
    0% {
      height: 0px;
    }
    100% {
      height: 50px;
    }
  }

  @keyframes bracket-vu {
    0% {
      height: 0px;
      top: 0px;
    }
    100% {
      top: -50px;
      height: 50px;
    }
  }

  @keyframes bracket-left {
    0% {
      width: 0px;
    }
    100% {
      width: 30px;
    }
  }

  @keyframes bracket-right {
    0% {
      width: 0px;
      left: 150px;
    }
    100% {
      width: 30px;
      left: 120px;
    }
  }

  @keyframes main-text {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes text-top {
    0% {
      opacity: 0;
      left: -50px;
    }
    100% {
      opacity: 1;
      left: -100px;
    }
  }

  @keyframes text-bottom {
    0% {
      opacity: 0;
      left: -70px;
    }
    100% {
      opacity: 1;
      left: 20px;
    }
  }
`;

export const Loader = (): JSX.Element => {
  return (
    <Styled>
      <div className='line one'></div>
      <div className='line two'></div>
      <div className='bracket-vd'></div>
      <div className='bracket-vu'></div>
      <div className='bracket-vd two'></div>
      <div className='bracket-vu two'></div>
      <div className='bracket-ht'></div>
      <div className='bracket-hb'></div>
      <div className='bracket-ht two'></div>
      <div className='bracket-hb two'></div>
      <div className='main-text'>NEWSSCRAPER</div>
      <div className='text-top'>Hämtar</div>
      <div className='text-bottom'>Nyheter</div>
      <div className='testline'></div>
    </Styled>
  );
};
