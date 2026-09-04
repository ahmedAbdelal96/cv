# إضافة مشاريع جديدة إلى الموقع

## الطريقة الأولى: استخدام لوحة التحكم (Admin Panel)

1. افتح المتصفح وانتقل إلى: `http://localhost:3000/en/admin/projects`
2. اضغط على زر "Add Project"
3. املأ البيانات التالية:
   - **Title**: عنوان المشروع (مطلوب)
   - **Slug**: رابط المشروع (يتم إنشاؤه تلقائياً من العنوان)
   - **Category**: تصنيف المشروع (web, mobile, design)
   - **Status**: حالة المشروع (completed, in-progress, planned)
   - **Description**: وصف قصير للمشروع (مطلوب)
   - **Content**: تفاصيل شاملة عن المشروع
   - **Technologies**: التقنيات المستخدمة مفصولة بفاصلة (React, Node.js, MongoDB)
   - **Tags**: الوسوم مفصولة بفاصلة (frontend, backend, fullstack)
   - **Demo URL**: رابط العرض التوضيحي
   - **GitHub URL**: رابط الكود على GitHub
   - **Client Name**: اسم العميل (اختياري)
   - **Project Date**: تاريخ المشروع
   - **Budget**: الميزانية (اختياري)
   - **Images URLs**: روابط الصور مفصولة بفاصلة (مطلوب)
   - **Featured**: جعل المشروع مميز
   - **Show on Home**: عرضه في الصفحة الرئيسية
   - **Show on Banner**: عرضه في البانر

4. اضغط على "Create Project"

## الطريقة الثانية: إضافة مشاريع تجريبية من قاعدة البيانات

قم بتشغيل الأمر التالي لإضافة 6 مشاريع تجريبية:

```bash
npm run seed:projects
```

هذا سيضيف المشاريع التالية:

1. E-Commerce Platform with Next.js
2. Real-time Chat Application
3. Task Management Dashboard
4. Portfolio Website Generator
5. AI-Powered Content Generator
6. Mobile Fitness Tracking App

## الطريقة الثالثة: استخدام API مباشرة

يمكنك إضافة مشروع جديد عن طريق إرسال POST request إلى:

```bash
POST http://localhost:3000/api/projects
Content-Type: application/json

{
  "title": "عنوان المشروع",
  "slug": "project-slug",
  "description": "وصف المشروع",
  "content": "تفاصيل شاملة عن المشروع",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "demoLink": "https://demo.example.com",
  "githubLink": "https://github.com/username/project",
  "technologies": ["React", "Node.js", "MongoDB"],
  "tags": ["fullstack", "web", "api"],
  "category": "web",
  "status": "completed",
  "clientName": "اسم العميل",
  "projectDate": "2024-01-15",
  "budget": "$10,000",
  "featured": true,
  "showOnHome": true,
  "showOnBanner": false
}
```

## عرض المشاريع

بعد إضافة المشاريع، يمكنك عرضها في:

- **صفحة المشاريع**: `http://localhost:3000/en/projects`
- **لوحة التحكم**: `http://localhost:3000/en/admin/projects`
- **الصفحة الرئيسية**: إذا كان `showOnHome: true`

## الفلاتر المتاحة في API

يمكنك تصفية المشاريع باستخدام المعاملات التالية:

```bash
# الحصول على المشاريع المميزة فقط
GET /api/projects?featured=true

# الحصول على المشاريع التي تظهر في الصفحة الرئيسية
GET /api/projects?showOnHome=true

# البحث في المشاريع
GET /api/projects?search=react

# تصفية حسب الفئة
GET /api/projects?category=web

# تصفية حسب الحالة
GET /api/projects?status=completed
```

## تحديث مشروع موجود

```bash
PUT http://localhost:3000/api/projects/{project_id}
Content-Type: application/json

{
  "title": "عنوان محدث",
  "description": "وصف محدث",
  ...
}
```

## حذف مشروع

```bash
DELETE http://localhost:3000/api/projects/{project_id}
```

## نصائح

- أضف صور عالية الجودة لجذب الانتباه
- استخدم وصف واضح ومختصر
- أضف روابط Demo و GitHub إن أمكن
- حدد التقنيات المستخدمة بدقة
- استخدم الوسوم المناسبة لتحسين البحث
- اختر حالة المشروع بدقة (completed, in-progress, planned)
