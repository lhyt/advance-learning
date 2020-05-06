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

func printSlice(arr []string) {
	fmt.Printf("len=%d cap=%d slice=%v\n",len(arr),cap(arr),arr)
}

func main() {
	fmt.Println("Hello, World!")
	max0 := max(1, 2)
	fmt.Println(max0)
	max1 := max(10, 2)
	fmt.Println(max1)
	arr := []int{1,2,3,4}
	fmt.Println(arr)
	fmt.Println(struct{
		title string
		author string
		subject string
		book_id int
	}{"Go 语言", "www.runoob.com", "Go 语言教程", 6495407})
	s := []string{"a", "b", "c"}
	for i, item := range s {
		fmt.Println("i=%d item=%s\n", i, item)
	}
	s1 := make([]string, 10, 100)
	if (s1 == nil) {
		fmt.Println("kong")
	}
	s1[1] = "A"
	fmt.Println(s)
	fmt.Println(s1)
	printSlice(s1)
	type ssss = map[int]int
	mymap := make(ssss)
	mymap[2] = 3
	mymap[3] = 3
	delete(mymap, 3)
	fmt.Println("i=%d", mymap[5] == 0)
}



