```ts
import fs from 'fs/promises';
import path from 'path';

export async function autoDelete(filePath: string) {
  try {
    if (!filePath.startsWith('/tmp')) {
      console.warn('Refusing to delete non-temp file:', filePath);
      return;
    }
    await fs.unlink(filePath);
    console.log(`File deleted: ${filePath}`);
  } catch (err) {
    console.error(`Failed to delete ${filePath}:`, err);
  }
}
```

---
### ✅ UI SNIPPET: Informational Header

```html
<div class="text-xs text-gray-600 bg-yellow-100 p-3 rounded">
  🚨 <strong>No data is stored.</strong> All uploads are processed instantly and deleted after analysis.
  You are responsible for the content you submit. <a href="/terms" class="underline">Read Terms of Use</a>.
</div>
```
