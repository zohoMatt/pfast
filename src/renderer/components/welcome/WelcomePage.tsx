import * as React from 'react';

const styles = require('./WelcomePage.scss');

interface WelcomeProps {
    title?: string;
    intro?: string;
    copyright?: string;
    src: string;
}

const WelcomePage: React.FunctionComponent<WelcomeProps> = ({ title, intro, copyright, src }) => (
    <div className={styles.bg}>
        <div className={styles.title}>{title || 'MasterPFAS'}</div>
        <img className={styles.image} src={src} alt="Header" />
        <div className={styles.intro}>
            {intro || 'A swift way to plot and compare PFAS adsorption curve.'}
        </div>
        <div className={styles.copyright}>{copyright || 'Copyright: MIT License by PP & Zoho'}</div>
        <div className={styles.btnRow}>
            <div className={styles.startBtn}>START</div>
        </div>
    </div>
);

export default WelcomePage;
