import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import Select from 'react-select';
import { useAuth } from '../../../context/AuthContext';

const dialogContent = DialogPrimitive.Content;
const dialogOverlay = DialogPrimitive.Overlay;

const StyledSelect = styled(Select)`
  margin-bottom: 30px;
`;

const StyledContent = styled(dialogContent)`
  background-color: white;
  border-radius: 6;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 440px;
  max-height: 85vh;
  padding: 25;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const NavLinkItem = styled.button`
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid;
  width: 144px;
  height: 40px;
  margin-right: 16px;
  color: black;
  cursor: pointer;
  font-size: 14px;
`;

const CloseButton = styled.button`
  color: black;
  font-size: 15px;
  margin-left: 350px;
  margin-top: 30px;
  background-color: transparent;
  border: none;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 20;
`;

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogClose = DialogPrimitive.Close;

export default function RenameModal({ allProjects, slug, projects }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchable, setSearchable] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.length == 0) {
      console.log('Nothing to update');
      router.push('/projects');
    } else {
      try {
        let projectsToChange = [];
        data.forEach((element) => {
          projectsToChange.push(element.value);
        });
        setSearchable(projectsToChange);

        await runTransaction(firestore, async (transaction) => {
          projects[0].forEach((project) => {
            transaction.update(doc(firestore, 'projects', project.id), {
              collections: '',
            });
          });
        }),
          await runTransaction(firestore, async (transaction) => {
            let array = [];
            let res;
            const q = query(
              collection(firestore, 'projects'),
              where('title', 'in', projectsToChange),
              where('uid', '==', user.uid)
            );
            const querySnapshot = await getDocs(q);
            const options = {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            };
            querySnapshot.forEach((doc) => {
              res = {
                ...doc.data(),
                id: doc.id,
                timestamp: doc
                  .data()
                  .timestamp.toDate()
                  .toLocaleDateString(undefined, options),
              };
              array.push(res);
            });
            setSearchResult(array);
            if (array.length == 0) {
              console.log('No projects to update');
            } else {
              array.forEach((project) => {
                console.log(project.id);
                transaction.update(doc(firestore, 'projects', project.id), {
                  collections: slug,
                });
              });
            }
          });
        router.push('/projects');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const projectsArray = [];
  allProjects[0].forEach((element) => {
    projectsArray.push({ value: element.title, label: element.title });
  });

  const chosenProjectsArray = [];
  projects[0].forEach((element) => {
    chosenProjectsArray.push({ value: element.title, label: element.title });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavLinkItem>Manage projects</NavLinkItem>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton onClick={(e) => handleSubmit(e)}>&#10004;</CloseButton>
        </DialogClose>
        <DialogTitle>Manage projects</DialogTitle>
        <StyledSelect
          defaultValue={chosenProjectsArray}
          isMulti
          name='projects'
          options={projectsArray}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={(data) => setData(data)}
        />
      </DialogContent>
    </Dialog>
  );
}
