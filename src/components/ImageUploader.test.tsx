import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageUploader from './ImageUploader';

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
  global.URL.revokeObjectURL = jest.fn();
});

function Wrapper() {
  const [image, setImage] = useState<File | null>(null);
  return <ImageUploader image={image} onChange={setImage} />;
}

test('picking a file stages a preview, and Remove clears it', async () => {
  render(<Wrapper />);

  const file = new File(['x'], 'test.png', { type: 'image/png' });
  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
  fireEvent.change(input, { target: { files: [file] } });

  expect(await screen.findByAltText('Staged X-ray')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Remove'));
  expect(screen.queryByAltText('Staged X-ray')).not.toBeInTheDocument();
});

test('picking a non-image file shows an error and no preview', async () => {
  render(<Wrapper />);

  const file = new File(['x'], 'notes.txt', { type: 'text/plain' });
  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
  fireEvent.change(input, { target: { files: [file] } });

  expect(await screen.findByText('Please choose an image file.')).toBeInTheDocument();
  expect(screen.queryByAltText('Staged X-ray')).not.toBeInTheDocument();
});
