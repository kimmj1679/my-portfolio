import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: {
      name: '김명준',
      education: '차의과학대학교 졸업',
      major: '의생명과학과',
      experience: '신입',
      photo: '',
    },
    sections: [
      { id: 'dev-story', title: '나의 개발 스토리', content: '', showInHome: true },
      { id: 'philosophy', title: '개발 철학', content: '', showInHome: true },
      { id: 'personal', title: '개인적인 이야기', content: '', showInHome: false },
    ],
    skills: [
      { id: 1, name: 'HTML', level: 80, category: 'Frontend', description: '시맨틱 마크업, 접근성 고려 구조화', showInMain: true },
      { id: 2, name: 'CSS', level: 75, category: 'Frontend', description: '반응형 디자인, Flexbox, Grid, 애니메이션', showInMain: true },
      { id: 3, name: 'JavaScript', level: 70, category: 'Frontend', description: 'ES6+, DOM 조작, 비동기 처리', showInMain: true },
      { id: 4, name: 'React', level: 40, category: 'Framework', description: '함수형 컴포넌트, Hooks, Context API', showInMain: true },
      { id: 5, name: 'Python', level: 50, category: 'Backend/AI', description: '웹 스크래핑, AI/ML 연동, 백엔드 로직', showInMain: false },
    ],
  });

  const getHomeData = () => {
    const homeContent = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary: section.content.length > 120
          ? section.content.substring(0, 120) + '...'
          : section.content,
      }));

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4);

    return { content: homeContent, skills: topSkills, basicInfo: aboutMeData.basicInfo };
  };

  return (
    <PortfolioContext.Provider value={{ aboutMeData, setAboutMeData, getHomeData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}

export default PortfolioContext;
