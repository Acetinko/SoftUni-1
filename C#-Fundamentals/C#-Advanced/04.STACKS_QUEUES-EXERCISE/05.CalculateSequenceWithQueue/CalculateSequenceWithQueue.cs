using System;
using System.Collections.Generic;
using System.Linq;

class CalculateSequenceWithQueue
{
    static void Main(string[] args)
    {
        long n = long.Parse(Console.ReadLine());
        Queue<long> queue = new Queue<long>(new long[] { n });
        Queue<long> result = new Queue<long>(new long[] { n });

        while (result.Count < 50)
        {
            long current = queue.Dequeue();
            queue.Enqueue(current + 1);
            queue.Enqueue(2 * current + 1);
            queue.Enqueue(current + 2);

            result.Enqueue(current + 1);
            result.Enqueue(2 * current + 1);
            result.Enqueue(current + 2);
        }

        Console.WriteLine(String.Join(" ", result.Take(50)));
    }
}
