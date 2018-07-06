using System;
using System.Collections.Generic;

class HotPotato
{
    static void Main(string[] args)
    {
        string[] children = Console.ReadLine().Split();
        int number = int.Parse(Console.ReadLine());

        Queue<string> queue = new Queue<string>(children);

        while (queue.Count != 1)
        {
            for (int i = 1; i < number; i++)
            {
                string tmp = queue.Dequeue();
                queue.Enqueue(tmp);
            }
            Console.WriteLine($"Removed {queue.Dequeue()}");
        }
        Console.WriteLine($"Last is {queue.Dequeue()}");
    }
}
