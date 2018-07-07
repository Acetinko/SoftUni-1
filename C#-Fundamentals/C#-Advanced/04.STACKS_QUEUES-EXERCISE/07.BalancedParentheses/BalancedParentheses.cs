using System;
using System.Collections.Generic;
using System.Linq;

class BalancedParentheses
{
    static void Main(string[] args)
    {
        char[] input = Console.ReadLine().ToCharArray();

        if (input.Length % 2 != 0)
        {
            Console.WriteLine("NO");
            Environment.Exit(0);
        }

        Stack<char> stack = new Stack<char>();
        bool isBalanced = true;

        for (int i = 0; i < input.Length; i++)
        {
            switch (input[i])
            {
                case '{':
                case '[':
                case '(':
                    stack.Push(input[i]);
                    break;
                case '}':
                    if (!stack.Any() || stack.Pop() != '{')
                    {
                        isBalanced = false;
                    }
                    break;
                case ']':
                    if (!stack.Any() || stack.Pop() != '[')
                    {
                        isBalanced = false;
                    }
                    break;
                case ')':
                    if (!stack.Any() || stack.Pop() != '(')
                    {
                        isBalanced = false;
                    }
                    break;
                default:
                    break;
            }
        }

        Console.WriteLine(isBalanced ? "YES" : "NO");
    }
}
