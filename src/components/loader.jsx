
import bananaIcon from '/banana.png'
export const Loader = () => {
    return (
        <div className='flex mt-40'>
            <img src={bananaIcon} className='mx-auto w-36 animate-spin'/>
        </div>
    )
}