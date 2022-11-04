import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import Modal from '../components/Modal/Modal';
import logo from '../public/logo.svg';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    user ? router.push('/projects') : null;
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='Fourtrack' content='A better way for recording music' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMain>
        <HeroSection>
          <StyledH1>
            A better way for <br /> recording music
          </StyledH1>

          <TitleCTA>
            <Modal background whiteText buttonTitle='Get started' />
            <Wrapper>
              <AiOutlineArrowRight color='#6D4DEB' size='25px'/>
              <Link href='/'>How dose it work?</Link>
            </Wrapper>
          </TitleCTA>
        </HeroSection>
        <CaroselSection>Carosel</CaroselSection>
        <ToolSection purple>
          <StyledH2>A new tool to capture your musical moments</StyledH2>
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
          <StyledDraftDiv></StyledDraftDiv>
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
        <Image src={logo} alt='Logo' />
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
`;
const HeroSection = styled.section`
  min-height: 713px;
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
  background-color: lightpink;
  width: 100%;
`;
const ToolSection = styled.section`
  min-height: 450px;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple}` : 'none'};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RecorderSection = styled.section`
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
  background-color: purple;
  width: 100%;
`;
const ControlsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 450px;
  width: 100%;
  background-color: ${(props) =>
    props.purple ? `${props.theme.purple}` : 'none'};
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
  background-color: ${(props) => (props.purple ? 'purple' : 'none')};
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
    props.purple ? `${props.theme.purple}` : 'none'};
  padding-bottom: 188px;
  padding-top: 188px;
`;
const StyledFooter = styled.footer`
  margin: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.purple ? 'purple' : 'none')};

  a {
    margin: 0 30px;
  }
`;
const LinkContainer = styled.div``;
