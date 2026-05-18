import { FaPlay, FaStop } from "react-icons/fa6";

const SearchVerse = ({ theme, searchVerse, setSearchVerse, searchResults, langId, handlePlayVerse, handleStop, currentVerseId, arFontSize, trFontSize }) => {
    return (
        <div className="space-y-6">
            <form>
                <div>
                    <label htmlFor="search">{langId === 1 ? "আয়াতসমূহ খুঁজুন (শুধু বাংলায়)" : "Search verses (only english)"}</label>
                    <input type="text" id="search" className="input w-full mt-1 mb-2" placeholder={langId === 1 ? "এখানে টাইপ করুন..." : "Type here..."} onInput={(e) => setSearchVerse(e.target.value)} />
                </div>
            </form>
            {searchVerse.length >= 3
                ? searchResults.length !== 0
                    ? <>
                        {searchResults?.map(result => <div className="space-y-4" key={result.surah.id}>
                            <h3 className="text-center text-2xl font-bold">{result.surah.transliteration}</h3>
                            {result.verses?.map(verse =>
                            <div key={verse.id} className="space-y-2 mb-2">
                                <div className="flex items-center gap-4">
                                    {currentVerseId[0] === result.surah.id && currentVerseId[1] === verse.id ? <button
                                        onClick={handleStop}
                                        className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                                    >
                                        <FaStop />
                                    </button> : <button
                                        onClick={() => handlePlayVerse(result.surah.id, verse.id)}
                                        className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                                    >
                                        <FaPlay />
                                    </button>}
                                    <div className="w-full">
                                        <p dir="rtl" className="mb-1 font-noto-naskh-arabic leading-loose" style={{
                                            fontSize: `${arFontSize}px`
                                        }}>{verse.text.replaceAll("ٱ", "ا")} <span className={`rounded-[50%] border ${theme === "light" ? "border-black" : "border-white"} inline-block p-2 text-xl`}>{verse.id}</span></p>
                                        <p className="text-left" style={{
                                            fontSize: `${trFontSize}px`
                                        }}>{verse.translation}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>)}
                        </div>)}
                    </>
                    : <h3 className="text-center text-2xl">{langId === 1 ? <><span className="font-bold">"{searchVerse}"</span>-এর জন্য কোন ফলাফল পাওয়া যায়নি।</> : <>No result found for <span className="font-bold">"{searchVerse}"</span></>}</h3>
                : <h3 className="text-center text-2xl font-bold">{langId === 1 ? "Search query অবশ্যই কমপক্ষে ৩ অক্ষরের হতে হবে" : "Search query must be at least 3 characters"}</h3>
            }
        </div>
    );
};

export default SearchVerse;