# إضافة مقالات جديدة إلى المدونة

## الطريقة الأولى: استخدام لوحة التحكم (Admin Panel)

1. افتح المتصفح وانتقل إلى: `http://localhost:3000/en/admin/blog`
2. اضغط على زر "New Article"
3. املأ البيانات التالية:
   - **Title**: عنوان المقال (مطلوب)
   - **Slug**: رابط المقال (يتم إنشاؤه تلقائياً من العنوان)
   - **Description**: وصف قصير للمقال (مطلوب)
   - **Excerpt**: مقتطف للمعاينة
   - **Content**: محتوى المقال بصيغة Markdown (مطلوب)
   - **Category**: تصنيف المقال (frontend, backend, fullstack)
   - **Read Time**: وقت القراءة بالدقائق
   - **Tags**: الوسوم مفصولة بفاصلة (react, nextjs, typescript)
   - **Image URL**: رابط الصورة العادية
   - **Featured Image URL**: رابط الصورة المميزة
   - **Published**: نشر المقال مباشرة
   - **Featured**: جعل المقال مميز

4. اضغط على "Create Article"

## الطريقة الثانية: إضافة مقالات تجريبية من قاعدة البيانات

قم بتشغيل الأمر التالي لإضافة 3 مقالات تجريبية:

```bash
npm run seed:articles
```

هذا سيضيف المقالات التالية:

1. Building Scalable APIs with NestJS and TypeScript
2. Next.js 14 Performance Optimization Guide
3. Microservices Architecture with Node.js

## الطريقة الثالثة: استخدام API مباشرة

يمكنك إضافة مقال جديد عن طريق إرسال POST request إلى:

```bash
POST http://localhost:3000/api/articles
Content-Type: application/json

{
  "title": "عنوان المقال",
  "slug": "article-slug",
  "description": "وصف المقال",
  "excerpt": "مقتطف قصير",
  "content": "# محتوى المقال بصيغة Markdown\n\n## عنوان فرعي\n\nنص المقال هنا...",
  "category": "backend",
  "readTime": 5,
  "tags": ["nodejs", "api", "backend"],
  "image": "https://example.com/image.jpg",
  "featuredImage": "https://example.com/featured.jpg",
  "published": true,
  "featured": false,
  "author": {
    "name": "Ahmed Abdelal",
    "avatar": "/placeholder-user.png"
  }
}
```

## عرض المقالات

بعد إضافة المقالات، يمكنك عرضها في:

- **صفحة المدونة**: `http://localhost:3000/en/blog`
- **صفحة المقال الفردي**: `http://localhost:3000/en/blog/article-slug`
- **لوحة التحكم**: `http://localhost:3000/en/admin/blog`

## نصائح

- استخدم Markdown لتنسيق المحتوى (العناوين، الأكواد، القوائم، إلخ)
- اختر slug واضح وسهل القراءة للمقال
- أضف وسوم مناسبة لتحسين البحث والتصنيف
- استخدم صور عالية الجودة
- حدد وقت القراءة بدقة لتحسين تجربة المستخدم
