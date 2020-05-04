package main

import (
	"fmt"
)

func If(condition bool, a, b interface {}) interface {} {
	if condition {
		return a
	}
	return b 
}

func max(a int, b int) int  {
	return If(a > b, a, b).(int)
}

func main() {
	fmt.Println("Hello, World!")
	max0 := max(1, 2)
	fmt.Println(max0)
	max1 := max(10, 2)
	fmt.Println(max1)
}



