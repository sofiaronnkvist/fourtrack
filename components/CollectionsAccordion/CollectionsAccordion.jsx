import * as Accordion from '@radix-ui/react-accordion';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { CiFileOn } from 'react-icons/ci';
import styled from 'styled-components';
import CollectionsModal from '../CollectionsModal/CollectionsModal';
import Link from 'next/link';
import RenameCollectionModal from '../RenameCollectionModal/RenameCollectionModal';

const ContextRoot = ContextMenu.Root;
const ContextTrigger = ContextMenu.Trigger;
const ContextPortal = ContextMenu.Portal;
const ContextContent = ContextMenu.Content;
const ContextLabel = ContextMenu.Label;
const ContextItem = ContextMenu.Item;

export default function CollectionsAccordion({ collections }) {
  return (
    <StyledAccordion type='single' collapsible>
      <Accordion.Item value='item-1'>
        <TriggerWrapper>
          <CiFileOn size='20px' />
          <StyledTrigger>Collections</StyledTrigger>
          <AccordionChevron aria-hidden size='20px' />
        </TriggerWrapper>
        <ContentWrapper>
          {collections &&
            collections[0].map((collection) => {
              return (
                <>
                  <ContextRoot>
                    <ContextTrigger>
                      <StyledContent>
                        <StyledLink
                          href={{
                            pathname: '/projects/collections/[slug]',
                            query: { slug: collection.title },
                          }}
                        >
                          {collection.title}
                        </StyledLink>
                      </StyledContent>
                    </ContextTrigger>
                    <ContextPortal>
                      <StyledContextContent>
                        <StyledContextItem>
                          <StyledContextButton>Delete</StyledContextButton>
                        </StyledContextItem>
                        <StyledContextItem>
                          <RenameCollectionModal collectionId={collection.id} />
                        </StyledContextItem>
                      </StyledContextContent>
                    </ContextPortal>
                  </ContextRoot>
                </>
              );
            })}
          <StyledContent>
            <CollectionsModal />
          </StyledContent>
        </ContentWrapper>
      </Accordion.Item>
    </StyledAccordion>
  );
}

const AccordionTrigger = Accordion.Trigger;
const AccordionRoot = Accordion.Root;
const AccordionContent = Accordion.Content;

const StyledTrigger = styled(AccordionTrigger)`
  color: black;
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const StyledAccordion = styled(AccordionRoot)`
  background-color: white;
  border-radius: 3px;
  width: 100%;
`;

const TriggerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`;

const ContentWrapper = styled.ul`
  margin-top: 0;
  padding-left: 2em;
`;

const StyledContent = styled(AccordionContent)`
  padding-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const AccordionChevron = styled(ChevronRightIcon)`
  transition: transform 300ms;
  [data-state='open'] & {
    transform: rotate(90deg);
  }
`;

const StyledContextContent = styled(ContextContent)`
  min-width: 150px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const StyledContextItem = styled(ContextItem)`
  font-size: 13px;
  line-height: 1;
  color: black;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
  box-shadow: ${(props) => props.theme.mdShadow};
  &:hover {
    background-color: lightgray;
  }
`;

const StyledContextButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  &:hover {
    background-color: lightgray;
  }
`;
