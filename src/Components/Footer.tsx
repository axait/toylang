import { Copyright } from 'lucide-react';

const Footer = () => {
    return (
        <div
            className='flex flex-row justify-center font-mono'
            style={{ textAlign: "center" }}
        >
            <div className='flex flex-row h-[10]' ><Copyright height={17} className='mt-0.5' />{new Date().getFullYear()}</div>

            <a href="http://github.com/axait/toylang" target="_blank" rel="noreferrer" className='flex flex-row ml-3'>
                <img src="https://github.githubassets.com/favicons/favicon.svg" width="20" height="20" alt="githublogo" />
                &nbsp;axait
            </a>
        </div>
    )
}

export default Footer
