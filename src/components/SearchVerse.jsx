const SearchVerse = ({ theme, searchVerse, setSearchVerse, searchResults, langId }) => {
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
                            {result.verses?.map(verse => <div key={verse.id} className="space-y-2 mb-2">
                                <p dir="rtl" className="text-2xl mb-1 font-noto-naskh-arabic">{verse.text.replaceAll("ٱ", "ا")} <span className={`rounded-[50%] border ${theme === "light" ? "border-black" : "border-white"} inline-block p-2 text-xl`}>{verse.id}</span></p>
                                <p className="text-lg">{verse.translation}</p>
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