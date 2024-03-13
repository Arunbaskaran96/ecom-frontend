import React from "react";
import classes from "./swipper.module.scss";
function XSwipper() {
  return (
    <div class="swiper">
      <swiper-container>
        <swiper-slide>
          <img
            className={classes.image}
            src="https://e-commerce-pied-xi.vercel.app/_next/image?url=%2Fimages%2Fhome%2Fbanner.webp&w=1920&q=75"
            alt="imag"
          />
        </swiper-slide>
        <swiper-slide>
          <div className={classes.slideContainer}>
            <img
              className={classes.image}
              src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg"
              alt="imag"
            />
            <div className={classes.content}>
              <h3>Lauch Soon</h3>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
}

export default XSwipper;
