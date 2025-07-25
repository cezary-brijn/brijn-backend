```tsx
export default function CheckboxLegal({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="border p-4 rounded bg-gray-50 text-sm">
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          required
          onChange={onAccept}
          className="mt-1"
        />
        <span>
          I confirm that I am either:
          <ul className="list-disc ml-6">
            <li>the person in the image,</li>
            <li>have their explicit permission,</li>
            <li>or the image is legally licensed for unrestricted use.</li>
          </ul>
          I understand that unauthorized uploads may violate privacy, copyright, or platform terms, and I accept full responsibility for my submission.
        </span>
      </label>
    </div>
  );
}
```

