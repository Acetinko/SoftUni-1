using System;
using System.Collections.Generic;
using System.Linq;

class TruckTour
{
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());

        var queue = new Queue<int[]>();

        for (int i = 0; i < n; i++)
        {
            int[] pump = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();
            queue.Enqueue(pump);
        }

        for (int currentStart = 0; currentStart < n - 1; currentStart++)
        {
            int fuel = 0;
            bool isSolution = true;

            for (int pumpsPassed = 0; pumpsPassed < n; pumpsPassed++)
            {
                int[] currentPump = queue.Dequeue();
                int pumpFuel = currentPump[0];
                int nextPumpDistance = currentPump[1];

                queue.Enqueue(currentPump);

                fuel += pumpFuel - nextPumpDistance;

                if (fuel < 0)
                {
                    currentStart += pumpsPassed;
                    isSolution = false;
                    break;
                }
            }

            if (isSolution)
            {
                Console.WriteLine(currentStart);
                Environment.Exit(0);
            }
        }

    }
}