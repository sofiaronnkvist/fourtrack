import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Modal from '../components/Modals/Modal/Modal';
import Navbar from '../components/Navbar/navbar';
//Images and svgs
import Logo from '../public/logo.svg';
import SquareIcon from '../public/SquareIcon';
import SmallRoundIcon from '../public/SmallRoundIcon';
import BigRoundIcon from '../public/BigRoundIcon';
import projectsImage from '../public/projects.webp';
import recorderImage from '../public/recorder.webp';
import { AiOutlineArrowRight } from 'react-icons/ai';
import recorderUnit from '../public/recorderUnit.webp';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    user ? router.push('/projects') : null;
  }, []);
  return (
    <div>
      <Head>
        <title>Fourtrack</title>
        <meta name='Fourtrack' content='A better way for recording music' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <StyledMain>
        <HeroSection>
          <StyledH1>
            A better way for <br /> recording music
          </StyledH1>
          <TitleCTA>
            <Modal background whiteText buttonTitle='Get started' />
            <Wrapper>
              <AiOutlineArrowRight color='#6D4DEB' size='25px' />
              <Link href='/'>How does it work?</Link>
            </Wrapper>
          </TitleCTA>
          <OrangeIconWrapper>
            <SquareIcon
              height={'155px'}
              width={'155px'}
              fillInner={'#EC8300'}
            />
          </OrangeIconWrapper>
          <YellowIconWrapper>
            <BigRoundIcon
              height={'283px'}
              width={'283px'}
              fillInner={'#EBBA00'}
            />
          </YellowIconWrapper>
          <BlueIconWrapper>
            <SmallRoundIcon
              height={'107px'}
              width={'107px'}
              fillInner={'#69B6D3'}
            />
          </BlueIconWrapper>
        </HeroSection>
        <CaroselSection>
          <PurpuleIconWrapper>
            <BigRoundIcon
              height={'447px'}
              width={'447px'}
              fillInner={'#B4ABDC'}
            />
          </PurpuleIconWrapper>

          <Image
            src={recorderImage}
            height={'847px'}
            width={'614px'}
            objectFit={'cover'}
            objectPosition={'80% 90%'}
            alt={'The Fourtrack dashboard'}
          />
          <Image
            src={projectsImage}
            height={'847px'}
            width={'800px'}
            objectFit={'cover'}
            objectPosition={'10% 90%'}
            alt={'The Fourtrack recorder'}
            style={{position: 'relative'}}
          />
        </CaroselSection>
        <ToolSection purple>
          <SecondBlueIconWrapper>
            <SquareIcon
              height={'164px'}
              width={'164px'}
              fillInner={'#69B6D3'}
            />
          </SecondBlueIconWrapper>

          <StyledH2>A new tool to capture your musical moments</StyledH2>
          <SecondOrangeIconWrapper>
            <BigRoundIcon
              height={'403px'}
              width={'403px'}
              fillInner={'#EBBA00'}
            />
          </SecondOrangeIconWrapper>
        </ToolSection>
        <RecorderSection>
          <TextWrapper>
            <StyledH3>But there is only four tracks?</StyledH3>
            <StyledP>
              Yes, there is “only” four tracks, and that´s enough to capture
              your idea. This is not a production tool but an ideation tool.
              Think of it like a sketch of you future hit.
            </StyledP>
          </TextWrapper>
          <StyledDraftDiv>
            <Image
              src={recorderUnit}
              alt={'The recorders four tracks in different colors.'}
            />
          </StyledDraftDiv>
          <ThirdOrangeIconWrapper>
            <BigRoundIcon
              height={'168px'}
              width={'168px'}
              fillInner={'#EC8300'}
            />
          </ThirdOrangeIconWrapper>
        </RecorderSection>
        <ControlsSection purple>
          <StyledH4>No more headaching controls</StyledH4>
          <StyledP center white>
            Creativity should not be limited by complicated controls. That´s why
            we have made a simple to use recording studio with a lot of great
            presets so you don´t get stuck in soundprocessing.
          </StyledP>
          <ImagePlaceholder></ImagePlaceholder>
        </ControlsSection>
        <CollabSection>
          <ThirdBlueIconWrapper>
            <BigRoundIcon
              classname={'blue'}
              height={'362px'}
              width={'362px'}
              fillInner={'#69B6D3'}
              // style={{ transform: 'translateX(-10%)' }}
            />
          </ThirdBlueIconWrapper>
          <ThirdYellowIconWrapper>
            <SquareIcon
              height={'152px'}
              width={'152px'}
              fillInner={'#EBBA00'}
            />
          </ThirdYellowIconWrapper>
          <TextContainer>
            <StyledH3>Collab with everyone</StyledH3>
            <StyledP>
              Share your ideas with everyone to take your song to the limit.
            </StyledP>
          </TextContainer>
        </CollabSection>
        <SignUpSection purple>
          <StyledH3 white>Try Fourtrack, it´s free</StyledH3>
        </SignUpSection>
      </StyledMain>

      <StyledFooter>
        <Logo />
        <div>
          <Link href='/'>
            <a>About</a>
          </Link>
          <Link href='/'>Feedback</Link>
          <Link href='/'>Terms and conditions</Link>
          <Link href='/'>How does it work?</Link>
        </div>
      </StyledFooter>
    </div>
  );
}

const StyledMain = styled.main`
  min-height: 713px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.grey100};
`;
const PurpuleIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  bottom: -36%;
  left: 4%;
`;
const YellowIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 16%;
  right: 10%;
`;
const OrangeIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 10%;
  left: 13%;
`;
const BlueIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 45%;
  right: 10%;
`;
const SecondBlueIconWrapper = styled.div`
  position: absolute;
  transform: rotate(17deg);
  z-index: 999;
  top: -10%;
  right: 8%;
`;
const SecondOrangeIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 30%;
  left: -210px;
`;

const HeroSection = styled.section`
  min-height: 500px;
  width: 100%;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledH1 = styled.h1`
  margin: 0;
  line-height: 0.9;
  font-size: 100px;
  font-weight: 500;
  z-index: 1;
`;
const TitleCTA = styled.div`
  margin-top: 67px;
  display: flex;
  align-items: center;

  a {
    color: #6d4deb;
    font-size: 18px;
    margin-left: 15px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 45px;
`;
const StyledH2 = styled.h2`
  margin: 0;
  line-height: 0.9;
  font-size: 84px;
  font-weight: 500;
  text-align: center;
  color: white;
  max-width: 925px;
`;
const StyledH3 = styled.h3`
  margin: 0;
  line-height: 0.9;
  font-size: 43px;
  font-weight: 500;
  color: ${(props) => (props.white ? 'white' : 'black')};
`;
const StyledH4 = styled.h4`
  margin: 0;
  line-height: 0.9;
  font-size: 60px;
  font-weight: 500;
  text-align: center;
  color: white;
`;
const StyledP = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.white ? 'white' : 'black')};
  text-align: ${(props) => (props.center ? 'center' : '')};
  text-align: ${(props) => (props.center ? 'center' : '')};
  max-width: 700px;
`;
const CaroselSection = styled.section`
  min-height: 713px;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  padding-top: 32px;

  image {
    position: relative;
  }
`;

const ToolSection = styled.section`
  position: relative;
  min-height: 450px;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RecorderSection = styled.section`
  position: relative;
  min-height: 450px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding-bottom: 188px;
  padding-top: 188px;
`;
const TextWrapper = styled.div`
  width: 50%;
  margin-left: 148px;
`;

const StyledDraftDiv = styled.div`
  min-height: 450px;
  width: 100%;
`;

const ThirdOrangeIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  bottom: -5%;
  right: 10%;
`;
const ControlsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 450px;
  width: 100%;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
  padding-bottom: 188px;
  padding-top: 188px;
`;
const ImagePlaceholder = styled.div`
  height: 284px;
  width: 1072px;
  margin-top: 80px;
  background-color: grey;
`;
const CollabSection = styled.section`
  position: relative;
  min-height: 800px;
  width: 100%;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
`;
const ThirdBlueIconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: -25%;
  .blue {
    transform: translateX(700px);
  }
`;
const ThirdYellowIconWrapper = styled.div`
  position: absolute;
  transform: rotate(17deg);
  z-index: 0;
  top: 7%;
  right: 156px;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 113px;
  right: 148px;
  width: 400px;
`;
const SignUpSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 900px;
  width: 100%;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
  padding-bottom: 188px;
  padding-top: 188px;
`;
const StyledFooter = styled.footer`
  margin: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};

  a {
    margin: 0 30px;
    color: ${(props) => props.theme.purple500};
  }
`;
