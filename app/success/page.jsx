export default function SuccessPage() {
  return (
    <div className="max-w-4xl mx-auto text-center p-10">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4 text-lg">Thank you for your purchase!</p>

      <a href="/" className="text-blue-600 font-semibold mt-6 inline-block">
        Go Back Home
      </a>
    </div>
  );
}
