// Script to seed sample articles into the database
import mongoose from 'mongoose';
import { connectDB } from '../backend/config/database';
import Article from '../backend/models/Article';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const sampleArticles = [
  {
    title: 'V0 Foundation Launches New Educational Initiative in Rural Communities',
    slug: 'v0-foundation-launches-new-educational-initiative-in-rural-communities',
    content: `
      <h2>Transforming Education Access</h2>
      <p>The V0 Foundation is proud to announce the launch of our latest educational initiative aimed at bringing quality education to rural communities across the region. This comprehensive program will provide resources, training, and support to underserved schools.</p>
      
      <h3>Program Highlights</h3>
      <p>Our new initiative includes:</p>
      <ul>
        <li>Distribution of educational materials to 50 rural schools</li>
        <li>Teacher training programs focusing on modern pedagogical methods</li>
        <li>Establishment of computer labs with internet connectivity</li>
        <li>Scholarship programs for outstanding students</li>
      </ul>
      
      <h3>Community Impact</h3>
      <p>We expect this initiative to benefit over 10,000 students directly and countless more through the ripple effect of improved education quality. Our team has worked closely with local communities to ensure the program meets their specific needs.</p>
      
      <p>The first phase of the program will begin in March 2026, with full implementation expected by September 2026.</p>
    `,
    excerpt: 'V0 Foundation announces a comprehensive educational initiative to bring quality education and resources to rural communities, impacting over 10,000 students.',
    author: 'V0 Foundation Team',
    category: 'education',
    tags: ['education', 'rural development', 'community', 'initiative'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop'
  },
  {
    title: 'Breaking Ground: V0 Foundation Complex Construction Begins',
    slug: 'breaking-ground-v0-foundation-complex-construction-begins',
    content: `
      <h2>A Milestone Achievement</h2>
      <p>Today marks a historic moment for the V0 Foundation as we officially break ground on our new foundation complex. This state-of-the-art facility will serve as the central hub for all our programs and initiatives.</p>
      
      <h3>Facility Features</h3>
      <p>The V0 Foundation Complex will include:</p>
      <ul>
        <li>Modern educational classrooms and computer labs</li>
        <li>Healthcare center with diagnostic facilities</li>
        <li>Sports facilities including football and basketball courts</li>
        <li>Research and innovation center</li>
        <li>Community gathering spaces</li>
        <li>Administrative offices</li>
      </ul>
      
      <h3>Sustainable Design</h3>
      <p>Our complex is designed with sustainability in mind, featuring solar panels, rainwater harvesting systems, and energy-efficient construction methods. We are committed to minimizing our environmental impact while maximizing community benefit.</p>
      
      <h3>Timeline and Progress</h3>
      <p>Construction is expected to take 18-24 months, with the grand opening planned for 2027. We will be providing regular updates on the construction progress.</p>
    `,
    excerpt: 'The V0 Foundation breaks ground on a state-of-the-art complex that will house educational facilities, healthcare services, sports amenities, and community spaces.',
    author: 'Construction Team',
    category: 'news',
    tags: ['foundation complex', 'construction', 'milestone', 'infrastructure'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop'
  },
  {
    title: 'Advancing Sickle Cell Research: New Partnerships and Breakthroughs',
    slug: 'advancing-sickle-cell-research-new-partnerships-and-breakthroughs',
    content: `
      <h2>Pioneering Healthcare Solutions</h2>
      <p>The V0 Foundation is making significant strides in sickle cell disease research through new partnerships with leading medical institutions and research centers.</p>
      
      <h3>Research Initiatives</h3>
      <p>Our current research focuses on:</p>
      <ul>
        <li>Early detection and screening programs</li>
        <li>Pain management protocols</li>
        <li>Genetic counseling and education</li>
        <li>Patient support networks</li>
        <li>Collaboration with international research teams</li>
      </ul>
      
      <h3>Community Screening Program</h3>
      <p>We have launched a free community screening program that has already tested over 5,000 individuals, providing crucial early detection and counseling services. This program has been instrumental in raising awareness about sickle cell disease.</p>
      
      <h3>Looking Forward</h3>
      <p>With continued support from our partners and donors, we aim to expand our research capabilities and reach even more communities in need of sickle cell disease awareness and care.</p>
    `,
    excerpt: 'V0 Foundation partners with medical institutions to advance sickle cell research, offering free community screening and support programs.',
    author: 'Dr. Sarah Johnson',
    category: 'healthcare',
    tags: ['sickle cell', 'research', 'healthcare', 'community screening'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop'
  },
  {
    title: 'Sport-Integrated School Program Shows Remarkable Results',
    slug: 'sport-integrated-school-program-shows-remarkable-results',
    content: `
      <h2>Combining Athletics with Academics</h2>
      <p>Our innovative Sport-Integrated School program has completed its first year, showing remarkable improvements in both academic performance and physical fitness among participating students.</p>
      
      <h3>Program Success Metrics</h3>
      <p>Key achievements include:</p>
      <ul>
        <li>25% improvement in overall academic performance</li>
        <li>95% student attendance rate</li>
        <li>50% increase in physical fitness levels</li>
        <li>Enhanced teamwork and leadership skills</li>
        <li>Improved student mental health and wellbeing</li>
      </ul>
      
      <h3>Student Testimonials</h3>
      <p>This program has changed my life. I never thought I could excel in both sports and academics, but now I am top of my class and part of the football team - says Michael, a 15-year-old program participant.</p>
      
      <h3>Expansion Plans</h3>
      <p>Due to the overwhelming success, we are expanding the program to include 10 more schools in the coming academic year, potentially benefiting 2,000 additional students.</p>
    `,
    excerpt: 'The Sport-Integrated School program demonstrates significant improvements in academic performance and physical fitness after its first year.',
    author: 'Sports Program Director',
    category: 'education',
    tags: ['sports', 'education', 'youth development', 'success story'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=400&fit=crop'
  },
  {
    title: 'Annual Fundraising Gala: A Night of Impact and Inspiration',
    slug: 'annual-fundraising-gala-a-night-of-impact-and-inspiration',
    content: `
      <h2>Celebrating Community Generosity</h2>
      <p>The V0 Foundation Annual Fundraising Gala was a tremendous success, raising over $500,000 to support our programs and initiatives for the coming year.</p>
      
      <h3>Event Highlights</h3>
      <p>The evening featured:</p>
      <ul>
        <li>Keynote speech by renowned philanthropist Dr. Emmanuel Adebayo</li>
        <li>Student performances showcasing our education program impact</li>
        <li>Silent auction featuring artwork from local artists</li>
        <li>Recognition of major donors and partners</li>
        <li>Announcement of new program initiatives</li>
      </ul>
      
      <h3>Fund Allocation</h3>
      <p>The funds raised will be distributed across our key program areas:</p>
      <ul>
        <li>40% to education programs</li>
        <li>30% to healthcare initiatives</li>
        <li>20% to foundation complex construction</li>
        <li>10% to administrative operations</li>
      </ul>
      
      <p>We extend our heartfelt gratitude to all attendees, sponsors, and donors who made this event possible.</p>
    `,
    excerpt: 'V0 Foundation Annual Fundraising Gala raises over $500,000 to support education, healthcare, and community programs.',
    author: 'Events Team',
    category: 'events',
    tags: ['fundraising', 'gala', 'community', 'donors'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    title: 'Research Partnership: Collaboration with Global Health Institute',
    slug: 'research-partnership-collaboration-with-global-health-institute',
    content: `
      <h2>Expanding Our Research Capabilities</h2>
      <p>The V0 Foundation is thrilled to announce a strategic partnership with the Global Health Institute (GHI) to advance research in tropical diseases and community health.</p>
      
      <h3>Partnership Objectives</h3>
      <p>This collaboration will focus on:</p>
      <ul>
        <li>Joint research projects on preventable diseases</li>
        <li>Knowledge exchange programs for healthcare workers</li>
        <li>Community health education initiatives</li>
        <li>Development of low-cost diagnostic tools</li>
        <li>Publication of research findings in peer-reviewed journals</li>
      </ul>
      
      <h3>Expected Impact</h3>
      <p>Through this partnership, we aim to develop innovative solutions that can be implemented in resource-limited settings, benefiting communities not just locally but across the region.</p>
      
      <h3>Research Priorities</h3>
      <p>Initial research will focus on malaria prevention, maternal health, and childhood nutrition - areas where we can make the most immediate impact.</p>
    `,
    excerpt: 'V0 Foundation partners with Global Health Institute to advance research in tropical diseases and develop innovative community health solutions.',
    author: 'Research Department',
    category: 'research',
    tags: ['partnership', 'research', 'global health', 'collaboration'],
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop'
  }
];

async function seedArticles() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected successfully!');

    // Clear existing articles (optional - comment out if you want to keep existing data)
    console.log('Clearing existing articles...');
    await Article.deleteMany({});

    // Insert sample articles
    console.log('Inserting sample articles...');
    const insertedArticles = await Article.insertMany(sampleArticles);
    
    console.log(`Successfully inserted ${insertedArticles.length} articles:`);
    insertedArticles.forEach(article => {
      console.log(`  - ${article.title} (slug: ${article.slug})`);
    });

    console.log('\nArticle seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding articles:', error);
    process.exit(1);
  }
}

// Run the seed function
seedArticles();
