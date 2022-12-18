---
title: '《Operating Systems: Three Easy Pieces》读书笔记（第 14-20 章）'
intro: 书接上回，本文是第 14-20 章的笔记。内容仅基于自身情况记录，仅供参考，Dialogue 的相关章节已略过。
comments: false
date: 2022-11-01 22:01:14
tags:
- OS
- 操作系统
---


书接上回，本文是第 14-20 章的笔记。内容基于自身情况记录，仅供参考，Dialogue 的相关章节已略过。

### Chapter 14: Interlude - Memory API

1. Memory Types:

* ***Stack Memory*** *(Automatic Memory)*: allocations and deallocations are managed implicitly by the compiler.
* ***Heap Memory***: allocations and deallocations are explicitly handled by programmers.

```c
#include <stdio.h>
int main(void) {
  int x[10];
  printf("%d\n", sizeof(x));  // 40.
  return 0;
}
```

2. Common Errors:

* Forgetting To Allocate Memory.
* Not Allocating Enough Memory.
* Forgetting to Initialize Allocated Memory.
* Forgetting To Free Memory.
* Freeing Memory Before You Are Done With It.
* Freeing Memory Repeatedly.
* Calling free() Incorrectly.

3. Memory Check Tools: *purify*, *valgrind*.
4. Memory System Calls: 

* ***free()***: brk, sbrk.
* ***malloc()***: mmap.

### Chapter 15: Mechanism - Address Translation

1. Hardware-based Address Translation: virtual address -> physical address.
2. ***base-and-bounds*** (dynamic relocation): **base register** + **bounds (limit) register** (may hold the size of the address space, or the physical address of the end of the address space), are all on MMU chip.
  
* Step 1: physical address = virtual address + base register (offset).
* Step 2: check the final physical address or virtual address against the bounds register to see whether the address is illegal.

\- **Dynamic Relocation: Hardware Requirements**:

![](1.png)

\- **Dynamic Relocation: Operating System Responsibilities**:

![](2.png)

3. ***Limited Direct Execution*** Interactions (Dynamic Relocation):

\- **Boot**:

![](3.png)

\- **Runtime**:

![](4.png)

### Chapter 16: Segmentation

1. ***Segmentation***: a segment is just a contiguous portion of the address space of a particular length, it allows the OS to place each one of those segments in different parts of physical memory, and thus avoid filling physical memory with unused virtual address space.

* Each segment of the VAS has a base and bound registers pair (multiple).
* The hardware uses **segment registers** during translation, 

2. Segment Register Values (with Protection): 

![](5.png)

* **Segment**: use the first several bits to determine the segement registers.
* **Base**: the value of base register.
* **Size**: the value of bound register.
* **Grows Positive**: specify the growing direction of the segment in memory.
* **Protection**: for supporting sharing between different VAS.

3. Coarse-grained and Fine-grained Segmentation:

* *Coarse-grained*: only has a few segments (i.e., code, stack, heap).
* *Fine-grained*: allowed for address spaces to consist of a large number of smaller segments with the help of segement table. The OS could better learn about which segments are in use and which are not and thus utilize main memory more effectively.

4. Potential issues of Segmentation:

* What should the OS do on a context switch? 
  * The segment registers must be saved and restored.
* Each segment might be a different size which may incur the issue of **external fragmentation** (physical memory becomes full of little holes of free space, making it difficult to allocate new segments, or to grow existing ones). 
  * Solved by rearranging the existing segments (costly).
  * Solved by using better memory management algorithms (best-fit, worst-fit, first-fit, buddy, etc).

### Chapter 17: Free-Space Management

1. ***Free-list***:

![](6.png)

* Contains references to all of the free chunks of space in the managed region of memory.
* **Splitting**: find a free chunk of memory that can satisfy the request and split it into two.
* **Coalescing**: merge the nearby chunks of free space into a single larger free chunk.
* Header structure for allocated block:

```c
typedef struct {
  int size;
  int magic;  // For sanity check, making sure the freed chunk is legal.
} header_t;
```

* Node structure of the Free-list:

```c
typedef struct __node_t {
  int size;
  struct __node_t *next;
} node_t;
```

2. ***Memory Allocation Strategies***:

* **Best Fit**: find the smallest fit.
  * Pros: try to reduce wasted space.
  * Cons: heavy performance penalty (exhaustive search).
* **Worst Fit** (performs badly): find the largest chunk and return the requested amount.
  * Pros: leave big chunks free instead of lots of small chunks.
  * Cons: heavy performance penalty (exhaustive search).
* **First Fit**: find the first block that is big enough and returns the requested amount.
  * Pros: fast. 
  * Cons: sometimes pollutes the beginning of the free list with small objects, this can be reduced by using **address-based ordering** which keeps the list ordered by the address of the free space.
* **Next Fit**: keep an extra pointer to the location within the list where one was looking last.
  * Pros: fast, but not better than "First Fit".
  * Cons: (similar to "First Fit").

3. Advanced Memory Allocation Strategies:

* *Segregated Lists*: if a particular application has one (or a few) popular-sized request that it makes, keep a separate list just to manage objects of that size, all other requests are forwarded to a more general memory allocator.
* *Buddy Allocation*: In such a system, free memory is first conceptually thought of as one big space of size 2<sup>N</sup>. When a request for memory is made, the search for free space recursively divides free space by two until a block that is big enough to accommodate the request is found.

4. Other data structures for managing space: binary trees, splay trees, or partially-ordered trees.

### Chapter 18: Paging - Introduction

1. ***Page Table***: **per-process** data structure, storing the address translations for each of the virtual pages of the address space. We divide VAS into fixed-sized units, each of which we call a page.

![](7.png)

2. ***VPN***: Virtual page number.
3. ***PFN*** (PPN): Physical frame number.
4. ***PTE***: Page table entry.

![](8.png)

* *P*: present bit, indicating whether this page is in physical memory or on disk.
* *R/W*: read/write bit (R/W) which determines if writes are allowed to this page.
* *U/S*: user/supervisor bit, which determines if user-mode processes can access the page.
* *PWT, PCD, PAT, G*: determine how hardware caching works for these pages.
* *A*: accessed bit, tracking whether a page has been accessed, and is useful in determining which pages are popular and thus should be kept in memory.
* *D*: dirty bit, indicating whether the page has been modified since it was brought into memory.

5. ***PTBR*** (page-table-base-register): which contains the physical address of the starting location of the page table.

```text
// The pseudo-code for "movl 21, %eax".
// Extract the VPN from the virtual address.
VPN = (VirtualAddress & VPN_MASK) >> SHIFT

// Form the address of the page-table entry (PTE).
PTEAddr = PTBR + (VPN * sizeof(PTE))

// Fetch the PTE.
PTE = AccessMemory(PTEAddr)

// Check if process can access the page.
if (PTE.Valid == False)
  RaiseException(SEGMENTATION_FAULT)
else if (CanAccess(PTE.ProtectBits) == False)
  RaiseException(PROTECTION_FAULT)
else
  // Access is OK: form physical address and fetch it.
  offset = VirtualAddress & OFFSET_MASK
  PhysAddr = (PTE.PFN << PFN_SHIFT) | offset
  Register = AccessMemory(PhysAddr)
```

6. Problems need to be solved of paging: 

* Overhead of the intense access to page table.
* Memory waste of page tables (per process).

### Chapter 19: Paging - Faster Translations (TLBs)

1. ***TLB*** (translation-lookaside buffer): is a part of the chip's MMU, a hardware cache of popular virtual-to-physical address translations. The TLB improves performance due to **spatial locality** (also some other optimization techniques are same). Hardware-managed TLB is usually designed for CISC, and the software-managed TLB is for RISC, it transfers the TLB miss signal via a trap (the "return-from-trap" should resume the instruction which caused the miss). The **software-managed** way is more flexible to OS and simple for hardware to achieve. The access to TLB miss-handling code could be handled by some pre-reserved, permanently-valid TLB entries, these translations always hit in the TLB. TLB is **fully associative**, this means that any given translation can be anywhere in the TLB, and that the hardware will search the entire TLB in parallel to find the desired translation. 

2. ***TLB Contents***: 

![](9.png)

* *valid*: indicate if the entry has been set.
* *prot*: protection bits.
* *ASID*: address space identifier, shorter than PID, used for differentiating the process this entry is valid for.
* *G*: Global bit, used for pages that are globally-shared among processes (ASID will be ignored).
* *C*: Coherence bit, determines how a page is cached by the hardware.
* *D*: Dirty bit, is marked when the page has been written to. 
* *V*: Valid bit, tells the hardware if there is a valid translation present in the entry.
* *page mask*: supports multiple page sizes.

A **wired register** can be set by the OS to tell the hardware how many slots of the TLB to reserve for the OS; the OS uses these reserved mappings for code and data that it wants to access during critical times, where a TLB miss would be problematic.

3. ***TLB Replacement Policy***: 

* **LRU**: common approach, but not good for some corner-case, like: a program loops over "n + 1" pages with a TLB of size "n".
* **Random**: simple.

4. ***TLB Issues***: 

* **TLB Coverage**: if the number of pages a program accesses in a short period of time exceeds the number of pages that fit into the TLB, the program will generate a large number of TLB misses.
* **Cache**: *physically-indexed cache* V.S. *virtually-indexed cache*. Address translation has to take place before the cache is accessed for the former one, the latter one requires complex hardware design.

### Chapter 20: Paging - Smaller Tables

1. Most systems use relatively small page sizes in the common case: **4KB** (as in x86) or **8KB** (as in SPARCv9). 
2. **Multiple Page Sizes**: many architectures (e.g., MIPS, SPARC, x86-64) now support multiple page sizes, a single large page (e.g., of size 4MB) can be used for a specific portion of the address space, enabling such applications to place a frequently-used (and large) data structure in such a space while consuming only a single TLB entry (it is to reduce pressure on the TLB).
3. **Paging with Segments**: one page table per logical segment (like code, heap, stack, and etc), the base register holds the value of the "base" physical address of each page table, and bounds register holds the value of the maximum valid page in the segment. But segmentation is not quite  flexible, and this way could also cause external fragmentation.

```text
SN = (VirtualAddress & SEG_MASK) >> SN_SHIFT
VPN = (VirtualAddress & VPN_MASK) >> VPN_SHIFT
// Use one of three segment base registers instead of PTBR.
AddressOfPTE = Base[SN] + (VPN * sizeof(PTE))
```

4. **Multi-level Page Tables**: it turns the linear page table into something like a tree.

![](10.png)

* It only allocates page-table space in proportion to the amount of address space you are using; thus it is generally compact and supports sparse address spaces.
* The goal is **to make every piece of the multi-level page table fit into a page vanishes**.
* The memory of the page tables could be swapped to disk when memory pressure gets a little tight (kernel virtual memory). 

![](11.png)

* The VPN could be splitted into several parts corresponding to different level of page directory.
* Same calculation pattern: ***PTEAddr = (PD0E.PFN << SHIFT) + (PD1Index * sizeof(PDE1)) ...***.


5. **Inverted Page Tables**: instead of having many page tables (one per process of the system), we keep a single page table that has an entry for each physical page of the system. The entry tells us which process is using this page, and which virtual page of that process maps to this physical page (PowerPC).
