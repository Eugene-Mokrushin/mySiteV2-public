import classes from './Footer.module.scss'
import DATA_footer from '../../data/footer'
import Image from 'next/image'


export default function Footer() {
 
    let socialNetworks = []

    

    Object.keys(DATA_footer.socialMedias).forEach(function (key, index) {
        const mediaData = DATA_footer.socialMedias[key]
        socialNetworks.push(
            <a href={mediaData[0]} key={index} className={classes.logoLink}>
                <Image
                    src={`/footer/${mediaData[1]}.svg`}
                    alt='socialMedias'
                    width={60}
                    height={60}
                    className={classes.logoImg}
                />
            </a>
        )
    })


    return (
        <footer className={classes.footer}>
            <div className={classes.socialsWrapper}>
                {socialNetworks}
            </div>
            <span className={classes.copy}>Eugene Mokrushin</span>
        </footer>
    )
}