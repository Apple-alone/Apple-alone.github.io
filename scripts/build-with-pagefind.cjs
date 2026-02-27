/* This is a script to build the site with Pagefind */

const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

// Detect the platform
function detectPlatform() {
<<<<<<< HEAD
  // Check environment variables
  if (process.env.VERCEL) {
    return 'vercel';
  }
  if (process.env.CF_PAGES) {
    return 'cloudflare';
  }
  if (process.env.NETLIFY) {
    return 'netlify';
  }
  if (process.env.GITHUB_ACTIONS) {
    return 'github';
  }
  
  // Check if specific directories exist
  if (existsSync('.vercel')) {
    return 'vercel';
  }
  
  // Default to standard dist directory
  return 'default';
=======
    // Check environment variables
    if (process.env.GITHUB_ACTIONS) {
        return 'github';
    }
    if (process.env.CF_PAGES) {
        return 'cloudflare';
    }
    if (process.env.NETLIFY) {
        return 'netlify';
    }
    if (process.env.EDGEONE) {
        return 'edgeone';
    }
    if (process.env.VERCEL) {
        return 'vercel';
    }

    // Check if specific directories exist
    if (existsSync('.vercel')) {
        return 'vercel';
    }

    // Default to standard dist directory
    return 'default';
>>>>>>> upstream/main
}

// Get Pagefind output directory
function getPagefindOutputDir(platform) {
<<<<<<< HEAD
  const outputDirs = {
    vercel: '.vercel/output/static',
    cloudflare: 'dist',
    netlify: 'dist',
    github: 'dist',
    default: 'dist'
  };
  
  return outputDirs[platform] || 'dist';
=======
    const outputDirs = {
        default: 'dist',
        github: 'dist',
        cloudflare: 'dist',
        netlify: 'dist',
        edgeone: 'dist',
        vercel: '.vercel/output/static',
    };

    return outputDirs[platform] || 'dist';
>>>>>>> upstream/main
}

// Main function
function main() {
<<<<<<< HEAD
  const platform = detectPlatform();
  const outputDir = getPagefindOutputDir(platform);
  
  console.log(`🚀 Detected deployment platform: ${platform}`);
  console.log(`📁 Pagefind output directory: ${outputDir}`);
  
  try {
    // Run Astro build
    console.log('🔨 Running Astro build...');
    execSync(`npx astro build`.trim(), { 
      stdio: 'inherit',
      cwd: process.cwd() // Ensure in the correct directory
    });
    
    // Check if output directory exists
    if (!existsSync(outputDir)) {
      console.error(`❌ Output directory does not exist: ${outputDir}`);
      process.exit(1);
    }
    
    // Run Pagefind
    console.log(`🔍 Running Pagefind search index generation...`);
    execSync(`npx pagefind --site ${outputDir}`, {
      stdio: 'inherit',
      cwd: process.cwd() // Ensure in the correct directory
    });
    
    console.log('✅ Build completed!');
    console.log(`📊 Search index generated at: ${outputDir}/pagefind/`);
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();
=======
    const platform = detectPlatform();
    const outputDir = getPagefindOutputDir(platform);

    console.log(`🚀 Detected deployment platform: ${platform}`);
    console.log(`📁 Pagefind output directory: ${outputDir}`);

    try {
        // Run Astro build
        console.log('🔨 Running Astro build...');
        execSync(`npx astro build`.trim(), {
            stdio: 'inherit',
            cwd: process.cwd() // Ensure in the correct directory
        });

        // Check if output directory exists
        if (!existsSync(outputDir)) {
            console.error(`❌ Output directory does not exist: ${outputDir}`);
            process.exit(1);
        }

        // Run Pagefind
        console.log(`🔍 Running Pagefind search index generation...`);
        execSync(`npx pagefind --site ${outputDir}`, {
            stdio: 'inherit',
            cwd: process.cwd() // Ensure in the correct directory
        });

        console.log('✅ Build completed!');
        console.log(`📊 Search index generated at: ${outputDir}/pagefind/`);

    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

main();
>>>>>>> upstream/main
