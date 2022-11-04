import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Modal from '../components/Modal/Modal';

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
          <StyledH1 className={styles.title}>
            A better way for <br /> recording music
          </StyledH1>

          <TitleCTA>
            <Modal buttonTitle='Get started' />
            <Link href='/'>How it works</Link>
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
      </StyledMain>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
const StyledMain = styled.main`
  min-height: 713px;
  padding: 4rem 0;
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
  background-color: ${(props) => (props.purple ? 'purple' : 'none')};
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
  background-color: ${(props) => (props.purple ? 'purple' : 'none')};
  padding-bottom: 188px;
  padding-top: 188px;
`;
const ImagePlaceholder = styled.div`
  height: 284px;
  width: 1072px;
  margin-top: 80px;
  background-color: grey;
`;
