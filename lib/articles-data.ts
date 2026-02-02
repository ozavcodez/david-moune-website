// Static article data (no backend required)

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const articles: Article[] = [
  {
    _id: '7',
    title: 'School Sport Integration Program: Transforming Education Through Athletics',
    slug: 'school-sport-integration-program-transforming-education',
    content: `
      <h2>Historical Context</h2>
      <p>Sport plays a significant role in the U.S. economy – larger than many would think. Sport has been used as a tool to foster peace and development all over the world. In 2001, the Inter-American Development Bank (IDB) announced it would use sport to promote economic and social development. On November 3, 2003, the UN General Assembly passed a resolution encouraging governments to use sport to advance their development and peace, and also declaring 2005 the "International Year of Sport and Physical Education".</p>
      
      <h3>Global Impact</h3>
      <p>Playing for Peace, a non-profit organization based in Washington, DC, has used basketball to bridge divides between Catholic and Protestant children in Northern Ireland and children from numerous racial backgrounds in South Africa. Often, these programs provide children their first opportunity to interact with children from outside their own communities.</p>
      
      <p>Search for Common Ground, a Washington-based non-profit organization dedicated to transforming the world's approach to conflict, set up a Football for Reconciliation Project in Burundi in 1999. This project held their first soccer tournament in an ethnically divided district and today continues to hold soccer tournaments in various communities.</p>
      
      <h3>Economic Development Through Sport</h3>
      <p>The International Labor Organization (ILO) Youth Sports Program works in partnership with governments and the sports sector to support the skills building and employment of young people. In Albania, the ILO together with the Albanian Olympic Committee and the UN system in Albania, sponsored a workshop that brought together key actors to discuss the relationship between sport and education in national youth policy.</p>
      
      <p>There is plenty of evidence that shows school sports integration can be used to spur economic development through construction and rehabilitation of sports facilities. The development of sports for entertainment creates employment and marketing opportunities. Manufacturing of sports equipment also serves as a source of jobs. Furthermore, sports programs can be a training ground for a new workforce, teaching skills that make young people more employable and productive.</p>
      
      <h3>Educational Value</h3>
      <p>Contrary to the perception of sports as peripheral to academics, primary and secondary school sports and collegiate athletics offer transformative learning experiences. Athletes develop discipline, perseverance, and effective communication skills that see them thrive in highly competitive environments – qualities that are transferable and contribute to success in business as well as other aspects of life.</p>
      
      <h2>Recent Highlights</h2>
      <p>The sports industry creates a wide range of jobs, from athletes and coaches to administrative staff, marketing professionals, and event managers. Additionally, jobs are created in related sectors, such as media, sports apparel, and facility management.</p>
      
      <h3>Economic Impact</h3>
      <p>Major American sports leagues (NFL, NBA, MLB, NHL) and college sports generate substantial revenue through ticket sales, broadcasting rights, sponsorships, and merchandising. The NFL alone generates billions in revenue annually, with 80% of their athletes recruited from high schools and colleges each year.</p>
      
      <p>The Super Bowl, one of the most-watched sporting events in the world, generates billions of dollars in economic activity. Events like the NBA Finals and the Olympics attract tourists, boost local businesses, and stimulate economic activity in host cities, creating a significant economic ripple effect.</p>
      
      <h3>Key Statistics</h3>
      <ul>
        <li>Division I athletics generated $15.8 billion in revenues in 2019 (NCAA)</li>
        <li>US youth sport market estimated at $43 billion in annual revenue (2023)</li>
        <li>8 of the 10 largest sports stadiums in the world are US college football venues</li>
      </ul>
      
      <h3>2023-2024 High School Athletics</h3>
      <p>In the 2023-2024 academic year, American high school athletics participation hit record highs:</p>
      <ul>
        <li>Total participation: 8,062,302 students</li>
        <li>Boys participation: 4,638,785 (record high)</li>
        <li>Boys' largest sport: Football (1,031,508 participants)</li>
        <li>Girls participation: 3,423,517 (record high)</li>
        <li>Overall increase: 210,469 from previous year</li>
      </ul>
      
      <p>These statistics demonstrate that athletes, schools, communities, and the country's economy are positively impacted by sport and school integration initiatives. All these can be replicated in Nigeria if the government, stakeholders, and the private sector can see the benefits of sport in education and tap into this opportunity.</p>
      
      <h2>Our Plan</h2>
      <p>To address this gap in our educational system, the government, private sector, schools, and communities must work together and explore several strategies:</p>
      
      <h3>Advocacy for Increased Funding</h3>
      <p>Lobbying for more state and federal funding for school sports programs. Having a robust framework and deliberate policy to revamp our school sport programs.</p>
      
      <h3>Community Partnerships</h3>
      <p>Partnering with local businesses, major companies, and organizations to secure sponsorships and donations.</p>
      
      <h3>Efficient Resource Management</h3>
      <p>Implementing cost-saving measures and efficient resource management to maximize the use of available funds. Renovation of schools infrastructure and sports facilities, including construction of world-class sports facilities will help improve student and community engagement.</p>
      
      <h3>Student Athletes Sponsorship</h3>
      <p>Engaging in scholarships for student athletes to cover tuition, housing, healthcare and food, as well as monthly stipends for expenses will encourage students participation in sports.</p>
      
      <h3>School Curriculum Integration</h3>
      <p>Sports should be integrated into our pre-primary, primary and secondary school curriculum as a compulsory subject with a syllabus. Students should be graded in their participation in sports activities which should be included in their CGPA. This will help to improve participation in sports.</p>
      
      <p>By taking the time and truly understanding and addressing these challenges, our schools can work towards providing sustainable, high-quality sports programs for all students.</p>
      
      <p><strong>David Mone</strong><br/>President<br/>David Mone Foundation</p>
    `,
    excerpt: 'An in-depth look at how school sport integration programs drive economic development, build character, and create opportunities for youth, with insights from American success stories and a vision for Nigeria.',
    author: 'David Mone',
    category: 'education',
    tags: ['sports', 'education', 'youth development', 'economic impact', 'school programs'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=400&fit=crop',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z'
  }
];

// Helper functions to mimic API behavior
export function getAllArticles() {
  return articles.filter(article => article.published);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug && article.published);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category && article.published);
}
