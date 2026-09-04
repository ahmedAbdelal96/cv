/**
 * Seed script for My Real Projects
 * Run: node src/scripts/seedMyProjects.js
 */
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI is required to seed the database');

async function seedMyProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read projects from JSON file
    const projectsPath = path.join(__dirname, '../../my-projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

    // Clear existing projects (optional - comment out if you want to keep them)
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    // Display inserted projects
    insertedProjects.forEach((project) => {
      console.log(`   - ${project.title} (${project.slug})`);
    });

    console.log('\n✨ Your real projects have been added successfully!');
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the seed function
seedMyProjects();
