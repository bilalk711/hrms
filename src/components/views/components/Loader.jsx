const Loader = ({ progress }) => {
    console.log(progress);
    return (
        <div className="w-full h-full bg-white flex-col flex items-center justify-center">
            <div className="w-96 h-2 rounded-xl border border-slate-100 text-center bg-white">
                <div className={`transition-all duration-150 ease-in ${progress === 3 ? "w-full" : `w-${progress}/4`} rounded-xl h-full bg-emerald-700`}/>
            </div>
            <div className="mt-2 text-black text-sm">Loading</div>
        </div>
    );
}

export default Loader;