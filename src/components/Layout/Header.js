import React from 'react';

import styles from './Header.module.css';
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <React.Fragment>
        <hearder className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton></HeaderCartButton>
        </hearder>
        <div className={styles['main-image']}>
            <img src={mealsImg} alt="Meals Image"/>
        </div>
    </React.Fragment>
}

export default Header;