import { Copyright } from 'lucide-react';
import GithubLogo from '../assets/github-logo.png'

const Footer = () => {
    return (
        <div
            className='flex flex-row justify-center font-mono mb-[15px]'
            style={{ textAlign: "center" }}
        >
            <div className='flex flex-row h-[10]' ><Copyright height={17} className='mt-0.5' />{new Date().getFullYear()}</div>

            <a href="http://github.com/axait/toylang" target="_blank" rel="noreferrer" className='flex flex-row ml-3'>
                <img src={GithubLogo} className='w-[20px] h-[20px]' alt="githublogo" />
                &nbsp;axait
            </a>
        </div>
    )
}

export default Footer
