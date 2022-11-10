import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { CiFileOn } from 'react-icons/ci';
import styled from 'styled-components';
import CollectionsModal from '../CollectionsModal/CollectionsModal';
import Link from 'next/link';

export default function CollectionsAccordion({ collections }) {
  return (
    <StyledAccordion type='single' defaultValue='item-1' collapsible>
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
