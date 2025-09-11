import React from "react";
import { Row, Col, CardHeader, Accordion, AccordionItem, AccordionHeader, AccordionBody } from "react-bootstrap";

/**
 * CommonAccordionFilter
 * A reusable accordion filter component.
 * 
 * Props:
 * - title: string - The title to display in the accordion header.
 * - children: React.ReactNode - The filter form elements to render inside the accordion body.
 * - defaultActiveKey?: string - The default open accordion key.
 * - className?: string - Optional className for styling.
 */
const CommonAccordionFilter: React.FC<{
  title?: string;
  children: React.ReactNode;
  defaultActiveKey?: string;
  className?: string;
}> = ({ title = "Filters", children, defaultActiveKey, className }) => (
  <Row>
    <Col xs={12}>
      <CardHeader className={className}>
        <Accordion defaultActiveKey={defaultActiveKey}>
          <AccordionItem eventKey="0">
            <AccordionHeader>
              <strong>{title}</strong>
            </AccordionHeader>
            <AccordionBody>
              {children}
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </CardHeader>
    </Col>
  </Row>
);

export default CommonAccordionFilter;
