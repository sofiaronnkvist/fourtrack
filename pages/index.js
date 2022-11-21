import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
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
import peoplePicture from '../public/People.webp';
import tapePicture from '../public/tape.webp';
import {
  OrangeAnimation,
  BlueAnimation,
  YellowAnimation,
  PurpleAnimation,
} from '../styles/animations';
import SignUp from '../components/SingUp/SignUp';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    user ? router.push('/projects') : null;
  }, []);
  return (
    <OuterWrapper>
      <div>
        <Navbar />
        <StyledMain>
          <HeroSection>
            <StyledH1>
              A better way of <br /> recording music
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
                height={'100%'}
                width={'100%'}
                fillInner={'#EC8300'}
              />
            </OrangeIconWrapper>
            <YellowIconWrapper>
              <BigRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#EBBA00'}
              />
            </YellowIconWrapper>
            <BlueIconWrapper>
              <SmallRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#69B6D3'}
              />
            </BlueIconWrapper>
          </HeroSection>
          <CaroselSection>
            <PurpuleIconWrapper>
              <BigRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#B4ABDC'}
              />
            </PurpuleIconWrapper>
            <TestWrapper>
              <Image
                src={recorderImage}
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'80% 90%'}
                alt={'The Fourtrack dashboard'}
              />
            </TestWrapper>
            <TestWrapperTwo>
              <Image
                src={projectsImage}
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'0% 90%'}
                alt={'The Fourtrack recorder'}
              />
            </TestWrapperTwo>
          </CaroselSection>
          <ToolSection purple>
            <SecondBlueIconWrapper>
              <SquareIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#69B6D3'}
              />
            </SecondBlueIconWrapper>

            <StyledH2>A new tool to capture your musical moments</StyledH2>
            <SecondOrangeIconWrapper>
              <BigRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#EC8300'}
              />
            </SecondOrangeIconWrapper>
          </ToolSection>
          <RecorderSection>
            <TextWrapper>
              <StyledH3>But there are only four tracks?</StyledH3>
              <StyledP>
                Yes, there are &#34;only&#34; four tracks, and that&#39;s enough
                to capture your idea. This is not a production tool but an
                ideation tool. Think of it as a sketch of you future hit.
              </StyledP>
            </TextWrapper>
            <StyledDraftDiv>
              <Image
                src={recorderUnit}
                alt={'The recorders four tracks in different colors.'}
                // height={'100%'}
                // width={'100%'}
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'0% 80%'}
              />
            </StyledDraftDiv>
            <ThirdOrangeIconWrapper>
              <BigRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#EC8300'}
              />
            </ThirdOrangeIconWrapper>
            <SecondPurpleIconWrapper>
              <SquareIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#B4ABDC'}
              />
            </SecondPurpleIconWrapper>
          </RecorderSection>
          <ControlsSection purple>
            <StyledH4>No more headaching controls</StyledH4>
            <StyledP center white>
              Creativity should not be limited by complicated controls.
              That&#39;s why we have made a simple to use recording studio with
              a lot of great presets so you don&#39;t get stuck in
              soundprocessing.
            </StyledP>
            <TapeRecorderPictureWrapper>
              <Image
                src={tapePicture}
                alt='Old school controls'
                // height={'100%'}
                // width={'100%'}
                layout={'fill'}
                objectFit={'cover'}
              />
            </TapeRecorderPictureWrapper>
            <SecondTapeRecorderPictureWrapper>
              <Image
                src={tapePicture}
                alt='Old school controls'
                // height={'100%'}
                // width={'100%'}
                layout={'fill'}
                objectFit={'cover'}
              />
            </SecondTapeRecorderPictureWrapper>
            <ThirdBlueIconWrapper>
              <BigRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#69B6D3'}
              />
            </ThirdBlueIconWrapper>
          </ControlsSection>
          <CollabSection>
            <ThirdYellowIconWrapper>
              <SquareIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#EBBA00'}
              />
            </ThirdYellowIconWrapper>
            <PeoplePictureWrapper>
              <Image
                src={peoplePicture}
                alt='People in bubbles'
                // height={'100%'}
                // width={'100%'}
                layout={'fill'}
                objectFit={'cover'}
              />
            </PeoplePictureWrapper>

            <TextContainer>
              <StyledH3>Collab with anyone</StyledH3>
              <StyledP>
                Share your ideas with anyone to take your song to the next
                limit.
              </StyledP>
            </TextContainer>
          </CollabSection>
          <SignUpSection purple>
            <StyledH3 white>Try Fourtrack, it&#39;s free</StyledH3>
            <SignUp />
            <FourthBlueIconWrapper>
              <SquareIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#69B6D3'}
              />
            </FourthBlueIconWrapper>
            <FourthOrangeIconWrapper>
              <BigRoundIcon
                height={'100%'}
                width={'100%'}
                fillInner={'#EC8300'}
              />
            </FourthOrangeIconWrapper>
          </SignUpSection>
        </StyledMain>

        <StyledFooter>
          <Logo />
          <FooterLinkContainer>
            <Link href='/'>
              <a>About</a>
            </Link>
            <Link href='/'>Feedback</Link>
            <Link href='/'>Terms and conditions</Link>
            <Link href='/'>How does it work?</Link>
          </FooterLinkContainer>
        </StyledFooter>
      </div>
    </OuterWrapper>
  );
}
const OuterWrapper = styled.div`
  width: 100vw;
  overflow-x: hidden;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
`;
const StyledMain = styled.main`
  max-width: 1440px;
  min-height: 713px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.grey100};
`;

const OrangeIconWrapper = styled.div`
  position: absolute;
  width: 155px;
  height: 155px;
  z-index: 0;
  top: 10%;
  left: 13%;
  animation: ${OrangeAnimation} 7s ease-in-out infinite;

  @media screen and (max-width: 500px) {
    left: -10%;
    top: 11%;
  }
`;
const YellowIconWrapper = styled.div`
  position: absolute;
  width: 283px;
  height: 283px;
  z-index: 0;
  bottom: 16%;
  right: 10%;
  overflow: hidden;
  animation: ${YellowAnimation} 10s ease-in-out infinite;

  @media screen and (max-width: 1120px) {
    bottom: 21%;
    right: 0%;
    svg {
      transform: translateX(100px);
    }
  }
  @media screen and (max-width: 500px) {
    width: 149px;
    height: 149px;
    bottom: 35%;
    right: 0%;
    svg {
      transform: translateX(40px);
    }
  }
`;
const BlueIconWrapper = styled.div`
  position: absolute;
  width: 107px;
  height: 107px;
  z-index: 0;
  bottom: 45%;
  right: 10%;
  overflow: hidden;
  animation: ${BlueAnimation} 10s ease-in-out infinite;

  @media screen and (max-width: 1120px) {
    bottom: 48%;
    right: 0%;
    svg {
      transform: translateX(50px);
    }
  }
  @media screen and (max-width: 500px) {
    width: 62px;
    height: 62px;
    bottom: 49%;
    right: 0%;
    svg {
      transform: translateX(0px);
    }
  }
`;

const HeroSection = styled.section`
  min-height: 570px;
  width: 100%;
  padding: 4rem 0;
  flex: 1;
  /* overflow-x: hidden; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledH1 = styled.h1`
  margin: 0;
  margin-top: 75px;
  line-height: 70px;
  font-size: clamp(2.5rem, 1.4667rem + 4.5926vw, 5.6rem);
  font-weight: 500;
  z-index: 1;
  @media screen and (max-width: 720px) {
    line-height: 56px;
  }
`;
const TitleCTA = styled.div`
  margin-top: 67px;
  display: flex;
  align-items: center;
  z-index: 10;

  a {
    color: ${(props) => props.theme.purple500};
    font-size: 18px;
    margin-left: 15px;
    cursor: not-allowed;
  }
  @media screen and (max-width: 720px) {
    margin-top: 80px;
    margin-bottom: 57px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    margin-top: 153px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 45px;

  @media screen and (max-width: 720px) {
    margin-left: 21px;
  }
  @media screen and (max-width: 500px) {
    margin-left: 0px;
    margin-top: 22px;
  }
`;
const StyledH2 = styled.h2`
  margin: 0;
  line-height: 0.9;
  font-size: clamp(2.5rem, 1.5317rem + 4.1315vw, 5.25rem);
  font-weight: 500;
  text-align: center;
  color: white;
  max-width: 70%;

  @media screen and (max-width: 500px) {
    line-height: 56px;
  }
`;
const StyledH3 = styled.h3`
  margin: 0;
  line-height: 0.9;
  font-size: 43px;
  font-weight: 500;
  color: ${(props) => (props.white ? 'white' : 'black')};

  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;
const StyledH4 = styled.h4`
  margin: 0;
  line-height: 0.9;
  font-size: 60px;
  font-weight: 500;
  text-align: center;
  color: white;
  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
`;
const StyledP = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.white ? 'white' : '#697177')};
  text-align: ${(props) => (props.center ? 'center' : '')};
  text-align: ${(props) => (props.center ? 'center' : '')};
  max-width: 700px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;
const CaroselSection = styled.section`
  width: 100vw;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
`;
const PurpuleIconWrapper = styled.div`
  position: absolute;
  width: 447px;
  height: 447px;
  z-index: 0;
  top: 60%;
  left: 100px;
  animation: ${PurpleAnimation} 8s ease-in-out infinite;

  @media screen and (max-width: 1400px) {
    left: -3%;
  }

  @media screen and (max-width: 900px) {
    left: -23%;
  }

  @media screen and (max-width: 720px) {
    left: -13%;
  }
  @media screen and (max-width: 500px) {
    width: 225px;
    height: 225px;
    bottom: -24%;
    right: -3%;
  }
`;

const TestWrapper = styled.div`
  position: relative;
  height: 847px;
  width: 50%;

  image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 500px) {
    height: 450px;
  }
`;
const TestWrapperTwo = styled.div`
  position: relative;
  height: 847px;
  width: 50%;

  image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 500px) {
    height: 450px;
  }
`;

const ToolSection = styled.section`
  position: relative;
  min-height: 450px;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    min-height: 800px;
  }
`;

const SecondBlueIconWrapper = styled.div`
  position: absolute;
  width: 164px;
  height: 164px;
  transform: rotate(17deg);
  z-index: 3;
  top: -10%;
  right: 8%;

  @media screen and (max-width: 500px) {
    right: -10%;
  }
`;
const SecondOrangeIconWrapper = styled.div`
  position: absolute;
  width: 403px;
  height: 403px;
  z-index: 0;
  top: 30%;
  left: -210px;

  @media screen and (max-width: 960px) {
    width: 269px;
    height: 269px;
    left: -90px;
    top: 59%;
  }
  @media screen and (max-width: 500px) {
    width: 215px;
    height: 215px;
    left: -90px;
    top: 81%;
  }
`;

const RecorderSection = styled.section`
  position: relative;
  min-height: 450px;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding-bottom: 188px;
  padding-top: 188px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;

    h3 {
      text-align: center;
    }
    p {
      text-align: center;
    }
  }
`;
const TextWrapper = styled.div`
  width: 50%;
  margin-left: 148px;

  @media screen and (max-width: 900px) {
    margin-left: 74px;
    width: 70%;
  }

  @media screen and (max-width: 600px) {
    margin: 24px 0px;
    padding: 0px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
`;

const StyledDraftDiv = styled.div`
  position: relative;
  height: 450px;
  width: 100%;
  @media screen and (max-width: 900px) {
    transform: translateX(50px);
  }
  @media screen and (max-width: 600px) {
    width: 845px;
    height: 384px;
    transform: translateX(30px);
  }
`;

const ThirdOrangeIconWrapper = styled.div`
  position: absolute;
  width: 168px;
  height: 168px;
  z-index: 1;
  bottom: -5%;
  right: 10%;
  @media screen and (max-width: 1200px) {
    bottom: -5%;
    right: -8%;
  }
`;
const SecondPurpleIconWrapper = styled.div`
  position: absolute;
  width: 316px;
  height: 316px;
  z-index: 1;
  bottom: -25%;
  left: -1%;
  @media screen and (max-width: 1200px) {
    width: 178px;
    height: 178px;
    bottom: -17%;
    left: -3%;
  }
  @media screen and (max-width: 600px) {
    width: 178px;
    height: 178px;
    bottom: -15%;
    left: -13%;
  }
`;
const ControlsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 450px;
  width: 100vw;
  z-index: 0;
  position: relative;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
  padding: 188px 24px;
`;
const TapeRecorderPictureWrapper = styled.div`
  position: relative;
  height: 284px;
  width: 1072px;
  margin-top: 80px;

  @media screen and (max-width: 1140px) {
    width: 1002px;
    height: 232px;
    transform: translateX(250px);
  }
  @media screen and (max-width: 600px) {
    width: 943px;
    height: 218px;
    transform: translateX(320px);
  }
`;
const SecondTapeRecorderPictureWrapper = styled.div`
  display: none;
  position: relative;
  margin-top: 21px;

  @media screen and (max-width: 1140px) {
    display: block;
    width: 1002px;
    height: 232px;
    transform: translateX(-250px);
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const CollabSection = styled.section`
  position: relative;
  min-height: 900px;
  width: 100%;
  z-index: 1;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};

  @media screen and (max-width: 700px) {
    margin: 0 15px;
  }
  @media screen and (max-width: 600px) {
    height: 900px;
  }
`;
const PeoplePictureWrapper = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  z-index: 0;
  left: 0;
  bottom: -100px;

  @media screen and (max-width: 910px) {
    width: 550px;
    height: 550px;
    bottom: 80px;
  }
  @media screen and (max-width: 600px) {
    width: 600px;
    height: 600px;
    bottom: -100px;
    left: -110px;
  }
`;
const ThirdBlueIconWrapper = styled.div`
  position: absolute;
  width: 362px;
  height: 362px;
  z-index: 1;
  right: 0;
  bottom: -180px;
  transform: translateX(70px);

  @media screen and (max-width: 720px) {
    width: 208px;
    height: 206px;
    bottom: -60px;
  }
`;
const FourthBlueIconWrapper = styled.div`
  position: absolute;
  width: 164px;
  height: 164px;
  transform: rotate(125deg);
  z-index: 3;
  top: 38%;
  left: 27%;

  @media screen and (max-width: 1200px) {
    left: 15%;
  }
  @media screen and (max-width: 850px) {
    z-index: -1;
  }
`;
const ThirdYellowIconWrapper = styled.div`
  position: absolute;
  width: 152px;
  height: 152px;
  transform: rotate(17deg);
  z-index: 2;
  top: 7%;
  right: 156px;
  @media screen and (max-width: 720px) {
    width: 94px;
    height: 94px;
    top: 0%;
    right: 46px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 113px;
  right: 10%;
  width: 400px;

  @media screen and (max-width: 1200px) {
    bottom: 50px;
    right: 48px;
    width: 200px;
  }
  @media screen and (max-width: 600px) {
    bottom: 630px;
    right: 4%;
    width: 340px;
    h3 {
      text-align: center;
      font-size: 30px;
    }
    p {
      text-align: center;
      font-size: 20px;
    }
  }
`;
const SignUpSection = styled.section`
  display: flex;
  z-index: 9;
  flex-direction: column;
  position: relative;
  align-items: center;
  gap: 70px;
  min-height: 900px;
  width: 100%;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple500}` : 'none'};
  padding-bottom: 188px;
  padding-top: 188px;
`;
const FourthOrangeIconWrapper = styled.div`
  position: absolute;
  width: 168px;
  height: 168px;
  z-index: 1;
  right: 25%;
  top: 50%;
  @media screen and (max-width: 1200px) {
    right: 8%;
  }
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

  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;
const FooterLinkContainer = styled.div`
  @media screen and (max-width: 720px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  a {
    margin: 5px 30px;
    cursor: not-allowed;

    @media screen and (max-width: 720px) {
      margin: 5px 10px;
    }
  }
  @media screen and (max-width: 720px) {
    margin-top: 20px;
  }
`;
