import Image from 'next/image';
import getData from './getData';
import Activity from './components/Activity';
import ActivityInteraction from './components/ActivityInteraction';

export const metadata = {
  title: 'Comeback',
  description:
    'Compare peak to current performance and determine target metrics for improvement.',
};

export default async function Home() {
  const data = await getData();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center center">
          <Image
            className="dark:invert"
            src="/arrow.svg"
            alt="comeback logo"
            width={50}
            height={50}
            priority
          />
          <h1 className="text-3xl flex">Comeback</h1>
        </div>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Compare peak to current performance
          </li>
          <li className="tracking-[-.01em]">
            Determine target metrics for improvement
          </li>
        </ol>

        {data && data.length > 0 ? (
          <div>
            <div className="flex flex-col gap-4 mb-8">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((activity) => {
                  const { activityId } = activity;
                  return (
                    <li key={activityId} className="text-sm">
                      <Activity activity={activity} />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-8">Peak Activity: </h2>
              <ActivityInteraction />
            </div>
          </div>
        ) : (
          <p className="text-red-500">No data available.</p>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
