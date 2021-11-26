import React from 'react';

import styles from './Header.module.css';
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
      <React.Fragment>
        <hearder className={styles.header}>
          <h1>ReactMeals</h1>
          <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </hearder>
        <div className={styles["main-image"]}>
          <img src={mealsImg} alt="Table full of Meals " />
        </div>
      </React.Fragment>
    );
}

export default Header;