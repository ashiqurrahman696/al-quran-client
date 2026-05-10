import SurahCard from './SurahCard';

const SurahList = ({ theme, filteredSurahs, openSurahModal, langId, setSearchSurah, searchSurah }) => {
    return (
        <div className="space-y-4">
            <form>
                <div>
                    <label htmlFor="search">{langId === 1 ? "সূরা খুঁজুন" : "Search surah"}...</label>
                    <input type="text" id="search" className="input w-full mt-1 mb-2" placeholder={langId === 1 ? "এখানে টাইপ করুন..." : "Type here..."} onInput={(e) => setSearchSurah(e.target.value)} />
                </div>
            </form>
            {filteredSurahs?.length !== 0 ? <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {filteredSurahs?.map(surah => <SurahCard theme={theme} key={surah.id} surah={surah} openSurahModal={openSurahModal} />)}
            </div> : <h3 className="text-center text-2xl">{langId === 1 ? <><span className="font-bold">"{searchSurah}"</span>-এর জন্য কোনো সূরা পাওয়া যায় নি</> : <>No surah found for <span className="font-bold">{searchSurah}</span></>}</h3>}
            
        </div>
    );
};

export default SurahList;