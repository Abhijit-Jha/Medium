

const Publishbar = ({onPublish}:{onPublish:()=>{}}) => {
  return (
    <div className="h-14 flex  justify-between p-2  shadow-sm ">
        <div className="flex space-x-10 ml-4">
      <div className="font-bold flex flex-col justify-center text-2xl ml-20 ">Medium</div>
      <div className="place-content-center font-thin">Drafts in knight</div>
      <div className="text-slate-400 place-content-center">Saved</div>
      </div>
      <div className=" flex space-x-10 mr-40 justify-evenly">
      <div>
      <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={onPublish}>Publish</button>
      </div>
      <div>
        <Avatar name="Abhijit"/>
        </div>
        </div>
    </div>
  )
}

interface AvatarProps {
    name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
    
    const avatarName = typeof name === 'string' ? name[0] : '';

    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{avatarName}</span>
        </div>
    );
};

export default Publishbar
