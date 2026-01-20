import type { BlogPost } from '../types';

// Helper function to generate a slug from a title
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric chars
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/-+/g, '-');      // Replace multiple - with single -
};

export const blogPostsData: BlogPost[] = [
{
        imageUrl: "images/desk3.png",
        category: "Personal Journey",
        title: "Problem Solving: Above the Waves, Below the Surface & In the Cloud",
        excerpt: "From teaching scuba diving in the Cayman Islands to building cloud solutions. Turns out, meticulous planning and staying calm when shit goes wrong works pretty much everywhere.",
        author: "Kim Hanlon",
        date: "Nov 15, 2023",
        slug: generateSlug("Problem Solving: Above the Waves, Below the Surface & In the Cloud"),
        content: `
            <p class="mb-4">The Cayman Islands' turquoise waters and Azure's cloud infrastructure don't have much in common at first glance. One's all physics and physiology, the other's servers and code. But after spending years as a PADI instructor and then pivoting to tech, I've realized the actual work is surprisingly similar.</p>
            
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Plan Everything, Twice</h4>
            <p class="mb-4">Technical diving is obsessive planning. You calculate gas consumption, bottom time, deco stops, and then you plan for when it all goes to hell. You don't go down without knowing exactly how you're coming back up. Building cloud infrastructure is the exact same mindset. You plan for servers dying, traffic spikes, security breaches - multiple backup plans for the inevitable clusterfuck. <span class="text-yellow-400 font-semibold">Both jobs are about building systems robust enough to handle things going wrong, because they will.</span></p>
            
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Stay Calm When Everything's on Fire</h4>
            <p class="mb-4">At 30 meters when your gear fails, panicking gets you killed. You stay calm, work through it systematically, fix the problem. It's weirdly similar to getting a critical system alert at 3 AM. Different environment, same skill: methodical troubleshooting when your heart rate's trying to spike.</p>
            
            <p class="mb-4">Whether I'm coaching someone through buoyancy control or helping a client scale their app, it's the same job: take something complex and intimidating, break it down, make it manageable. The tools changed - fins and regulator swapped for a keyboard and terminal - but the core work hasn't. Solve problems. Help people succeed. Don't overcomplicate it.</p>
        `
    },
    {
        imageUrl: "images/blog2.png",
        category: "Hospitality",
        title: "Beyond the 'Gram: Why Your Restaurant Needs Its Own Website",
        excerpt: "Stop paying hefty commissions to delivery apps and fighting the algorithm. A custom website is your digital storefront, giving you control over your menu, brand, and profits.",
        author: "Kim Hanlon",
        date: "Nov 12, 2023",
        slug: generateSlug("Beyond the 'Gram: Why Your Restaurant Needs Its Own Website"),
        content: `
            <p class="mb-4">Your food is art, but are you letting delivery apps and social media platforms frame it for you? Relying solely on third-party services means you're losing money on every order and handing over your valuable customer relationships.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Own Your Digital Kitchen</h4>
            <p class="mb-4">A dedicated website is the most powerful tool for a modern restaurant. It's your central hub for menus, reservations, and telling your unique story.</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Eliminate Commission Fees:</strong> Integrate your own online ordering system and <span class="text-yellow-400 font-semibold">stop paying 15-30%</span> to delivery apps. The savings go directly to your bottom line.</li>
                <li><strong>Control Your Brand:</strong> Showcase your dishes with stunning, high-resolution photography and present your menu exactly how you want. No more generic, templated layouts.</li>
                <li><strong>Streamline Reservations:</b> A built-in booking system makes it easy for customers to reserve a table, reducing phone calls and preventing double-bookings.</li>
                <li><strong>Build Customer Loyalty:</strong> Capture emails and build a direct marketing channel to announce new menus, special events, and promotions to your most loyal patrons.</li>
            </ul>
        `
    },
    {
        imageUrl: "images/blog3.png",
        category: "Personal Branding",
        title: "From Fit-fluencer to Fitness Pro: Level Up with a Pro Website",
        excerpt: "Your Instagram is great for motivation, but a professional website is where you build a real business. Sell plans, manage bookings, and build a brand that's all you.",
        author: "Kim Hanlon",
        date: "Nov 09, 2023",
        slug: generateSlug("From Fit-fluencer to Fitness Pro: Level Up with a Pro Website"),
        content: `
            <p class="mb-4">You've built a strong following on social media with your fitness expertise. But when it comes to converting that following into a sustainable business, an Instagram bio link just doesn't cut it. It's time to build a professional headquarters for your brand.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Your 24/7 Digital Gym</h4>
            <p class="mb-4">A professional website transforms your personal brand into a scalable business, giving you the tools to monetize your knowledge and build deeper client relationships.</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Sell Digital Products:</strong> Easily sell custom workout plans, nutrition guides, and video courses. <span class="text-yellow-400 font-semibold">Automate delivery and payments</span> to create passive income streams.</li>
                <li><strong>Integrated Booking System:</strong> Allow clients to view your availability and book one-on-one sessions directly on your site, syncing with your calendar to eliminate back-and-forth emails.</li>
                <li><strong>Showcase Transformations:</strong> Create compelling case studies with client testimonials and before-and-after photos to provide powerful social proof and attract new clients.</li>
                <li><strong>Establish Authority:</strong> Use a blog to share your expertise, training philosophies, and nutrition tips. This builds trust and establishes you as a go-to expert in your niche.</li>
            </ul>
        `
    },
    {
        imageUrl: "images/blog4.png",
        category: "Business Growth",
        title: "Your Music, Your Rules: Why Every Musician Needs a Website",
        excerpt: "Tired of platforms taking a cut of your merch and ticket sales? It's time to own your brand. A personal website is your digital home base, not just another profile.",
        author: "Kim Hanlon",
        date: "Nov 05, 2023",
        slug: generateSlug("Your Music, Your Rules: Why Every Musician Needs a Website"),
        content: `
            <p class="mb-4">Platforms like Spotify and Bandcamp are essential for discovery, but they're rented space. You're bound by their rules, their branding, and—most importantly—their fees. When you sell merch or tickets through a third party, a percentage of your hard-earned money goes straight into their pocket.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Take Back Control</h4>
            <p class="mb-4">A dedicated website puts you in the driver's seat. It's your digital venue, record store, and fan club, all in one. Here’s why that matters:</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Direct-to-Fan Sales:</strong> Sell your music, merch, and tickets directly to your audience and <span class="text-yellow-400 font-semibold">keep 100% of the profit</span>. No more commission fees.</li>
                <li><strong>Own Your Audience:</strong> Build an email list that you control. You can't be de-platformed from your own mailing list. It's a direct line to your most dedicated fans.</li>
                <li><strong>Unified Brand:</strong> Create an immersive experience that reflects your artistic vision, without the clutter and branding of another company.</li>
            </ul>
        `
    },
    {
        imageUrl: "images/blog5.png",
        category: "E-commerce",
        title: "Sell Your Craft, Not Your Soul: The Case for Your Own Online Store",
        excerpt: "Etsy is a great starting point, but rising fees and fierce competition can hurt your bottom line. Take control of your artisan business with a beautiful, custom e-commerce site.",
        author: "Kim Hanlon",
        date: "Oct 28, 2023",
        slug: generateSlug("Sell Your Craft, Not Your Soul: The Case for Your Own Online Store"),
        content: `
            <p class="mb-4">As a creator of unique, handcrafted goods, your brand is everything. While marketplaces like Etsy give you a platform, they also put you in a crowded digital flea market where you're just one stall among thousands. It's hard to stand out, and the constant algorithm changes can feel like you're building your business on shifting sand.</p>
             <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Build Your Own Brand, Not Someone Else's</h4>
            <p class="mb-4">Moving your business to its own website is like moving from that market stall to a beautiful boutique on the high street. Suddenly, you're in control.</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Higher Profit Margins:</strong> Say goodbye to listing fees, transaction fees, and offsite ad fees. You set the prices, and <span class="text-yellow-400 font-semibold">you keep the revenue</span>.</li>
                <li><strong>Tell Your Story:</strong> A dedicated site gives you the space to share your passion, your process, and what makes your work special. This builds a connection with customers that marketplaces can't replicate.</li>
                <li><strong>Customer Loyalty:</strong> When customers buy from YourBrand.com, they remember YourBrand, not Etsy. You can build a loyal following and encourage repeat business through email marketing and special offers.</li>
            </ul>
        `
    },
    {
        imageUrl: "images/blog9.png",
        category: "Branding & Portfolio",
        title: "Your Portfolio, Your Power: Why Instagram Isn't Enough for Photographers",
        excerpt: "Social media is for marketing, but a professional website is for closing deals. Showcase your high-resolution work without compression, algorithms, or distractions.",
        author: "Kim Hanlon",
        date: "Oct 25, 2023",
        slug: generateSlug("Your Portfolio, Your Power: Why Instagram Isn't Enough for Photographers"),
        content: `
            <p class="mb-4">Instagram is a fantastic tool for getting your photos seen, but it's a terrible place to host a professional portfolio. Your best work is compressed, cropped to fit a square, and sandwiched between ads and cat videos. It screams 'amateur', even if your work is world-class.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">The Professional's Choice</h4>
            <p class="mb-4">A potential client looking to hire you for a wedding, a commercial shoot, or to buy a print needs more than a feed of squares. They need a professional, curated experience.</p>
             <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>High-Resolution Showcase:</strong> Display your images in <span class="text-yellow-400 font-semibold">stunning, full-screen detail</span>, exactly as you intended them to be seen.</li>
                <li><strong>Curated Galleries:</b> Organize your work into distinct projects or categories (e.g., Weddings, Portraits, Landscapes) to show your range and expertise.</li>
                <li><strong>Business Tools:</strong> Integrate essential tools like a contact form for bookings, private client galleries for proofing, and even a print store to create new revenue streams.</li>
            </ul>
        `
    },
     {
        imageUrl: "images/blog8.png",
        category: "Lead Generation",
        title: "Build Trust, Not Just Houses: A Tradesperson’s Guide to a Killer Website",
        excerpt: "In the trades, reputation is everything. A professional website acts as your digital showroom, showcasing your best work and making it easy for new clients to find you.",
        author: "Kim Hanlon",
        date: "Oct 22, 2023",
        slug: generateSlug("Build Trust, Not Just Houses: A Tradesperson’s Guide to a Killer Website"),
        content: `
             <p class="mb-4">When a homeowner has a leaky pipe or needs a new kitchen, what's the first thing they do? They search online. If you're not there, you're invisible. Relying on directory sites is a gamble—you're listed right next to your biggest competitors, often forcing you to compete on price alone.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Your 24/7 Salesperson</h4>
            <p class="mb-4">A simple, professional website works for you around the clock, building trust before you even pick up the phone.</p>
             <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Showcase Your Work:</strong> A gallery of high-quality photos of your finished projects is the most powerful tool you have. <span class="text-yellow-400 font-semibold">Let your work speak for itself</span>.</li>
                <li><strong>Display Testimonials:</strong> Positive reviews from happy clients are digital gold. They build instant credibility and trust with potential customers.</li>
                <li><strong>Generate Quality Leads:</strong> A clear contact form and your phone number on every page makes it easy for visitors to take the next step. You get leads directly, without paying a middleman.</li>
            </ul>
        `
    },
    {
        imageUrl: "https://picsum.photos/seed/pulsar-beat/600/400",
        category: "Web Animation",
        title: "The Art of the Drop: Translating DJing Skills into Web Animation Timing",
        excerpt: "Learn how the principles of building and releasing tension in a DJ set can create unforgettable, rhythm-driven web animations with GSAP.",
        author: "Kim Hanlon",
        date: "Oct 18, 2023",
        slug: generateSlug("The Art of the Drop: Translating DJing Skills into Web Animation Timing"),
        content: `
            <p class="mb-4">As a former electronic music DJ, I spent years learning how to control the energy of a room. It's all about tension and release, building anticipation to a fever pitch before 'the drop' sends the crowd into a frenzy. It struck me recently how similar this is to crafting compelling web animations.</p>
            <p class="mb-4">In web design, <span class="text-yellow-400 font-semibold">'the drop' is that moment of payoff</span>—a button that springs to life, a page transition that feels seamless, or a hero title that animates in with authority. Using a tool like GSAP (GreenSock Animation Platform), we can orchestrate these moments with the same precision as a DJ mixing tracks.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Timing is Everything</h4>
            <p>Just like a DJ uses BPMs and phrasing, GSAP uses timelines, delays, and easing functions to control the rhythm of an animation. An ease of 'power4.out' can feel like a smooth, building crescendo, while 'elastic.out' can feel like a bouncy, energetic drop. By sequencing animations on a timeline, we create a narrative flow, guiding the user's eye and making the experience more intuitive and enjoyable.</p>
        `
    },
    {
        imageUrl: "images/dev3.png",
        category: "UX Design",
        title: "Decompression Stops & User Flows: Lessons from Technical Diving",
        excerpt: "Technical scuba diving is about meticulous planning and risk management. These same principles can build safer, more intuitive user experiences.",
        author: "Kim Hanlon",
        date: "Oct 11, 2023",
        slug: generateSlug("Decompression Stops & User Flows: Lessons from Technical Diving"),
        content: `
            <p class="mb-4">In technical scuba diving, you don't just jump in the water. Every minute, every piece of gear, and every potential emergency is planned for. Your 'user flow' is your dive plan, and a 'bug' could have serious consequences. This mindset is incredibly valuable in UX design.</p>
            <p class="mb-4"><span class="text-yellow-400 font-semibold">'Decompression stops'</span> in diving are mandatory pauses on the way up to safely release nitrogen from the body. In UX, these are moments where we should intentionally slow the user down—like a confirmation modal before deleting important data—to prevent critical errors.</p>
        `
    },
    // New blog posts for SEO
    {
        imageUrl: "https://picsum.photos/seed/code-wexford/600/400", // Placeholder image
        category: "Local SEO",
        title: "Boosting Your Business in Wexford: The Power of Local Web Development",
        excerpt: "Discover how a custom website tailored for the Wexford market can attract local customers and outshine competitors.",
        author: "Kim Hanlon",
        date: "Dec 01, 2023",
        slug: generateSlug("Boosting Your Business in Wexford: The Power of Local Web Development"),
        content: `
            <p class="mb-4">For businesses in Wexford, standing out in the digital landscape is more important than ever. While global reach is appealing, often your strongest customer base is right here in County Wexford. This is where local web development and a strong online presence become invaluable.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Why Local Focus Matters for Wexford Businesses</h4>
            <p class="mb-4">When potential customers in Enniscorthy, Gorey, or Wexford town search for "web design Wexford" or "software development Wexford," you want your business to be the first they see. A website built with a local focus:</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Connects with the Community:</strong> Demonstrates an understanding of the local market and local needs.</li>
                <li><strong>Improves Search Engine Visibility:</strong> Google prioritizes local businesses for local searches.</li>
                <li><strong>Builds Trust:</strong> Customers often prefer to work with local providers they can meet face-to-face.</li>
            </ul>
            <p class="mb-4">At Devdactyl, we specialize in creating custom web solutions for Wexford businesses. We understand the nuances of the local market and how to craft a digital presence that resonates with your community while driving growth.</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Key Elements of a Locally Optimized Website</h4>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Local Keywords:</strong> Integrating "Wexford web design," "software developer Wexford," and similar terms naturally into your site's content.</li>
                <li><strong>Google My Business Integration:</strong> Ensuring your website is linked to a fully optimized Google Business Profile.</li>
                <li><strong>Location-Specific Content:</strong> Blog posts or service pages that address specific needs or events within Wexford.</li>
                <li><strong>Mobile Responsiveness:</strong> A significant portion of local searches happen on mobile devices.</li>
            </ul>
            <p class="mb-4">Don't let your Wexford business get lost in the digital noise. Invest in a web presence that speaks directly to your local audience and converts browsers into loyal customers. Let's build something great, right here in Wexford.</p>
        `
    },
    {
        imageUrl: "https://picsum.photos/seed/wexford-web-design/600/400", // Placeholder image
        category: "Web Design",
        title: "The Essential Guide to Web Design for Small Businesses in Wexford",
        excerpt: "From eye-catching aesthetics to powerful functionality, learn what makes a small business website successful in today's digital age.",
        author: "Kim Hanlon",
        date: "Nov 28, 2023",
        slug: generateSlug("The Essential Guide to Web Design for Small Businesses in Wexford"),
        content: `
            <p class="mb-4">For small businesses across Wexford, a website is no longer a luxury – it's a necessity. It acts as your 24/7 storefront, your primary marketing tool, and a crucial touchpoint for potential customers. But what makes a truly effective website, especially for local enterprises?</p>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Beyond a Digital Brochure: What Your Website Needs</h4>
            <p class="mb-4">Many small business owners think a website just needs to "look nice." While aesthetics are important, a high-performing website for a Wexford business needs to be a functional asset:</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Clear Call-to-Actions (CTAs):</strong> Make it obvious how visitors can contact you, request a quote, or make a purchase.</li>
                <li><strong>Mobile Responsiveness:</strong> With most searches happening on phones, your site *must* look and work perfectly on all devices.</li>
                <li><strong>Fast Loading Speed:</strong> Users (and Google) hate slow websites. Optimization is key.</li>
                <li><strong>SEO-Friendly Structure:</strong> Designed from the ground up to be found by search engines, especially for local searches like "web design Wexford" or "plumber Wexford."</li>
                <li><strong>Security (HTTPS):</strong> Essential for trust and search rankings.</li>
            </ul>
            <h4 class="text-xl font-bold text-yellow-400 mt-6 mb-2">Choosing the Right Web Design Partner in Wexford</h4>
            <p class="mb-4">When you're looking for web design services in Wexford, consider a partner who understands your business goals and the local market. At Devdactyl, we focus on creating bespoke websites that are not just visually appealing but also strategically built to help your business grow. We prioritize user experience, search engine optimization, and robust functionality to ensure your investment delivers real results.</p>
            <p class="mb-4">Whether you're a cafe in New Ross, a boutique in Gorey, or a service provider in Wexford town, a well-designed website can be your most powerful tool for attracting new clients and serving existing ones better. Let's discuss how we can elevate your online presence.</p>
        `
    }
];