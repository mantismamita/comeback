import getData from './getData';
import Logo from './components/Logo';
import Activity from './components/Activity';
import ActivityInteraction from './components/ActivityInteraction';
import ActivityComparison from './components/ActivityComparison';
import Card from './components/Card';

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
          <Logo />
        </div>
        <div className="lg:flex gap-16">
          <p className="mb-6 lg:mb-0 text-lg text-gray-100 max-w-xl">
            Compare your peak to your current performance and determine target
            metrics for improvement. This application will allow you to peruse
            your Garmin data to compare past and current activities.
          </p>
          <div
            className="max-w-2xl"
            style={
              {
                '--gradient-start': 'var(--color-purple-200)',
                '--gradient-end': 'var(--color-pink-200)',
              } as React.CSSProperties
            }
          >
            <Card>
              <ol className="list-outside list-decimal font-mono text-base">
                <li className="mb-2 tracking-[-.01em]">
                  Choose a record of an activity recorded on your Garmin device
                  with metrics that youu wish to match or exceed. You will need
                  to know the type of activity and the date.
                </li>
                <li className="tracking-[-.01em]">
                  Determine target metrics for improvement
                </li>
              </ol>
            </Card>
          </div>
        </div>

        {data && data.length > 0 ? (
          <div className="w-full">
            <div className="flex flex-col gap-4 mb-8">
              <h2 className="text-lg font-semibold">Your peak performance:</h2>
              <ActivityInteraction type="peak" />
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <h2 className="text-lg font-semibold">
                Your current performance:
              </h2>
              <ActivityInteraction type="current" />
            </div>

            <ActivityComparison />

            <div className="flex flex-col gap-4 mb-8 mt-12">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((activity) => {
                  const { activityId } = activity;
                  return (
                    <li key={activityId} className="text-sm">
                      <Activity activity={activity} withBorder />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No data available.</p>
        )}
      </main>
      {/* Footer section TODO? */}
    </div>
  );
}
