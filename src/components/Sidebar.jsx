import { FaGear } from 'react-icons/fa6';

const Sidebar = ({theme, setTheme, languages, langId, setLangId, reciters, reciterId, setReciterId}) => {
    return (
        <div className="drawer">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-1" className="btn btn-primary fixed bottom-4 right-4"><FaGear /></label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-100 min-h-full w-75 p-6 space-y-4">
                    {/* Sidebar content here */}
                    <h2 className="font-bold text-2xl">{langId === 1 ? "থিম" : "Theme"}</h2>
                    <div className="flex gap-4">
                        <button type="button" className={`btn cursor-pointer ${theme === "light" ? "btn-primary" : "bg-white/5"}`} onClick={() => setTheme("light")}>{langId === 1 ? "লাইট" : "Light"}</button>
                        <button type="button" className={`btn cursor-pointer ${theme === "night" ? "btn-primary" : "bg-black/5"}`} onClick={() => setTheme("night")}>{langId === 1 ? "নাইট" : "Night"}</button>
                    </div>
                    <h2 className="font-bold text-2xl">{langId === 1 ? "ভাষা" : "Language"}</h2>
                    <div className="flex gap-4">
                        {languages?.map(lang => <button type="button" key={lang.id} className={`btn cursor-pointer ${theme === "light"
                        ? langId === lang.id ? "btn-primary" : "bg-black/5"
                        : langId === lang.id ? "btn-primary" : "bg-white/5"}`} onClick={() => setLangId(lang.id)}>{lang.name}</button>)}
                    </div>
                    <h2 className="font-bold text-2xl">{langId === 1 ? "পাঠকগণ" : "Reciters"}</h2>
                    <div className="space-y-4">
                        {reciters?.map(reciter => <div key={reciter.id} className={`card ${theme === "light"
                            ? reciterId === reciter.id ? "bg-primary text-white" : "bg-black/5"
                            : reciterId === reciter.id ? "bg-primary text-black" : "bg-white/5"} w-full shadow-sm cursor-pointer ${reciterId === reciter.id && "bg-primary"}`} onClick={() => setReciterId(reciter.id)}>
                            <figure>
                                <img
                                    src={reciter.img}
                                    alt={langId === 1 ? reciter.name_bn : reciter.name} />
                            </figure>
                            <div className="card-body text-center">
                                <h2 className="card-title justify-center">{langId === 1 ? reciter.name_bn : reciter.name}</h2>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;