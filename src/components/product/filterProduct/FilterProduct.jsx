import React from "react";
import classes from "./filterproduct.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaFilter } from "react-icons/fa";

function FilterProduct({ priceRange, handlePriceChange }) {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h4>Filters</h4>
      </div>
      <div className={classes.accContainer}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.categoryContainer}>
              <select className={classes.select}>
                <option>All Products</option>
                <option>Mobile</option>
                <option>Computer</option>
                <option>Smart Watch</option>
                <option>HeadPhone</option>
              </select>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Price Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.sliderContainer}>
              <Slider
                min={0}
                max={100000}
                getAriaLabel={() => "Price range"}
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Ratings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              aria-label="Temperature"
              defaultValue={0}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks
              min={0}
              max={5}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default FilterProduct;
